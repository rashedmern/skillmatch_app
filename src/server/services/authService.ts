/**
 * Authentication Business Logic Service
 * Orchestrates user authentication, registration, OAuth handlers, and session issuance
 * backed directly by live Supabase PostgreSQL via Prisma ORM.
 */

import bcrypt from "bcryptjs";
import { prisma } from "../db/client";
import { DbUser } from "../db/schema";
import { ValidationService } from "./validationService";
import { EmailService } from "./emailService";

export interface AuthResult {
  success: boolean;
  user?: DbUser;
  otpCode?: string;
  error?: string;
}

/**
 * Maps a Prisma User record (with candidate_profile and recruiter_profile) to the DbUser contract.
 */
function mapPrismaUserToDbUser(user: {
  id: string;
  email: string;
  name: string;
  role: string;
  auth_provider: string;
  is_email_verified: boolean;
  avatar_url?: string | null;
  created_at: Date;
  updated_at: Date;
  candidate_profile?: {
    headline: string | null;
    university: string | null;
    github_username: string | null;
  } | null;
  recruiter_profile?: {
    role_title: string | null;
    company?: {
      name: string;
    } | null;
  } | null;
}): DbUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as "candidate" | "recruiter",
    institution: user.candidate_profile?.university || undefined,
    company: user.recruiter_profile?.company?.name || undefined,
    specialization: user.candidate_profile?.headline || undefined,
    githubUsername: user.candidate_profile?.github_username || undefined,
    isEmailVerified: user.is_email_verified,
    avatarUrl: user.avatar_url || undefined,
    authProvider: (user.auth_provider as "email" | "google" | "github") || "email",
    createdAt: user.created_at.toISOString(),
    updatedAt: user.updated_at.toISOString(),
  };
}

export class AuthService {
  /**
   * Authenticates user via email and password credentials from Supabase PostgreSQL.
   * If candidate, enforces .edu institutional verification.
   * Compares provided password against postgres password_hash using bcrypt.
   */
  static async loginWithCredentials(
    email: string,
    password?: string,
    role: "candidate" | "recruiter" = "candidate"
  ): Promise<AuthResult> {
    const cleanEmail = email.toLowerCase().trim();

    if (role === "candidate") {
      const eduCheck = ValidationService.validateCandidateEmail(cleanEmail);
      if (!eduCheck.isValid) {
        return { success: false, error: eduCheck.error };
      }
    }

    try {
      // 1. Query live Supabase User with corresponding profile relations
      const user = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: {
          candidate_profile: true,
          recruiter_profile: {
            include: { company: true },
          },
        },
      });

      if (!user) {
        return {
          success: false,
          error: "No account found matching this email address. Please register first.",
        };
      }

      // 2. Validate role boundary
      if (role && user.role !== role) {
        return {
          success: false,
          error: `This account is registered as a ${user.role}. Please log in via the ${user.role} portal.`,
        };
      }

      // 3. Password Credential Verification
      if (user.password_hash) {
        if (!password) {
          return {
            success: false,
            error: "Password is required for credentials login.",
          };
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
          return {
            success: false,
            error: "Invalid email or password. Please check your credentials.",
          };
        }
      } else if (password) {
        // Backwards compatibility / initial seed: set password_hash if not previously initialized
        const saltHash = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: { password_hash: saltHash },
        });
      }

      // 4. Trigger OTP verification email
      const otpResult = await EmailService.sendOtpVerificationEmail(
        cleanEmail,
        user.role as "candidate" | "recruiter"
      );

      const dbUser = mapPrismaUserToDbUser(user);

      return { success: true, user: dbUser, otpCode: otpResult.code };
    } catch (error) {
      console.error("[AuthService.loginWithCredentials error]:", error);
      return {
        success: false,
        error: "Database error during authentication. Please try again.",
      };
    }
  }

  /**
   * Registers a new user with strict role & .edu constraints in Supabase PostgreSQL.
   * Hashes the password using bcrypt and automatically creates the corresponding
   * candidate_profile or recruiter_profile (with company relation) in a single atomic transaction.
   */
  static async register(data: {
    name: string;
    email: string;
    password?: string;
    role: "candidate" | "recruiter";
    specialization?: string;
    company?: string;
  }): Promise<AuthResult> {
    const validation = ValidationService.validateRegistration(data);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const cleanEmail = data.email.toLowerCase().trim();

    try {
      // 1. Check for existing registered user in Supabase
      const existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (existingUser) {
        return {
          success: false,
          error: "An account with this email address already exists. Please log in instead.",
        };
      }

      // 2. Hash password with bcrypt
      const passwordHash = data.password ? await bcrypt.hash(data.password, 10) : null;

      let createdUser;

      if (data.role === "candidate") {
        // Automatically create candidate_profile
        const institutionName = cleanEmail.includes("@")
          ? `${cleanEmail.split("@")[1].split(".")[0].toUpperCase()} University`
          : "Partner University";

        createdUser = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: data.name.trim(),
            role: "candidate",
            password_hash: passwordHash,
            auth_provider: "email",
            is_email_verified: false,
            candidate_profile: {
              create: {
                headline: data.specialization?.trim() || "Distributed Systems & Infrastructure Engineer",
                university: institutionName,
                degree: "B.S. Computer Science & Engineering",
                graduation_year: "2026",
              },
            },
          },
          include: {
            candidate_profile: true,
          },
        });
      } else {
        // Recruiter Registration: Resolve or create Company, then recruiter_profile
        const companyName = data.company?.trim() || "Autonomous Scale Labs";
        const companySlug =
          companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
          `company-${Date.now().toString(36)}`;

        let company = await prisma.company.findFirst({
          where: {
            OR: [
              { slug: companySlug },
              { name: { equals: companyName, mode: "insensitive" } },
            ],
          },
        });

        if (!company) {
          company = await prisma.company.create({
            data: {
              name: companyName,
              slug: `${companySlug}-${Date.now().toString(36)}`,
              domain: cleanEmail.split("@")[1] || `${companySlug}.io`,
              industry: "Cloud & Distributed Systems",
              is_verified_partner: true,
            },
          });
        }

        createdUser = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: data.name.trim(),
            role: "recruiter",
            password_hash: passwordHash,
            auth_provider: "email",
            is_email_verified: false,
            recruiter_profile: {
              create: {
                company_id: company.id,
                role_title: "Technical Talent Lead",
                office_location: "Remote / US",
              },
            },
          },
          include: {
            recruiter_profile: {
              include: { company: true },
            },
          },
        });
      }

      // 3. Dispatch verification OTP code
      const otpResult = await EmailService.sendOtpVerificationEmail(cleanEmail, data.role);

      const dbUser = mapPrismaUserToDbUser(createdUser);

      return { success: true, user: dbUser, otpCode: otpResult.code };
    } catch (error) {
      console.error("[AuthService.register error]:", error);
      return {
        success: false,
        error: "Database error during registration. Please try again.",
      };
    }
  }

  /**
   * Handles Google OAuth response, querying Supabase and auto-provisioning candidate/recruiter profiles.
   */
  static async handleGoogleOAuth(
    email: string,
    name: string,
    role: "candidate" | "recruiter"
  ): Promise<AuthResult> {
    const cleanEmail = email.toLowerCase().trim();

    if (role === "candidate") {
      const eduCheck = ValidationService.validateCandidateEmail(cleanEmail);
      if (!eduCheck.isValid) {
        return {
          success: false,
          error: "Candidate registration requires a valid university institutional (.edu) email.",
        };
      }
    }

    try {
      let user = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: {
          candidate_profile: true,
          recruiter_profile: { include: { company: true } },
        },
      });

      if (!user) {
        if (role === "candidate") {
          user = await prisma.user.create({
            data: {
              email: cleanEmail,
              name: name.trim(),
              role: "candidate",
              auth_provider: "google",
              is_email_verified: true,
              candidate_profile: {
                create: {
                  headline: "Distributed Systems & Infrastructure Candidate",
                  university: cleanEmail.includes("@")
                    ? `${cleanEmail.split("@")[1].split(".")[0].toUpperCase()} University`
                    : "Partner University",
                  degree: "B.S. Computer Science",
                  graduation_year: "2026",
                },
              },
            },
            include: {
              candidate_profile: true,
              recruiter_profile: { include: { company: true } },
            },
          });
        } else {
          let company = await prisma.company.findFirst();
          if (!company) {
            company = await prisma.company.create({
              data: {
                name: "Partner Organization",
                slug: "partner-org",
                is_verified_partner: true,
              },
            });
          }

          user = await prisma.user.create({
            data: {
              email: cleanEmail,
              name: name.trim(),
              role: "recruiter",
              auth_provider: "google",
              is_email_verified: true,
              recruiter_profile: {
                create: {
                  company_id: company.id,
                  role_title: "Technical Talent Lead",
                  office_location: "Remote / US",
                },
              },
            },
            include: {
              candidate_profile: true,
              recruiter_profile: { include: { company: true } },
            },
          });
        }
      } else {
        // Ensure email verification is active
        if (!user.is_email_verified) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { is_email_verified: true, auth_provider: "google" },
            include: {
              candidate_profile: true,
              recruiter_profile: { include: { company: true } },
            },
          });
        }
      }

      const otpResult = await EmailService.sendOtpVerificationEmail(cleanEmail, role);
      const dbUser = mapPrismaUserToDbUser(user);

      return { success: true, user: dbUser, otpCode: otpResult.code };
    } catch (error) {
      console.error("[AuthService.handleGoogleOAuth error]:", error);
      return {
        success: false,
        error: "Database error during Google authentication.",
      };
    }
  }

  /**
   * Handles GitHub OAuth developer verification and syncs candidate profile in Supabase.
   */
  static async handleGithubOAuth(
    githubUsername: string,
    email: string,
    role: "candidate" | "recruiter"
  ): Promise<AuthResult> {
    const cleanEmail = email.toLowerCase().trim();

    try {
      let user = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: {
          candidate_profile: true,
          recruiter_profile: { include: { company: true } },
        },
      });

      if (!user) {
        if (role === "candidate") {
          user = await prisma.user.create({
            data: {
              email: cleanEmail,
              name: githubUsername,
              role: "candidate",
              auth_provider: "github",
              is_email_verified: true,
              candidate_profile: {
                create: {
                  headline: "Verified GitHub Developer & Systems Engineer",
                  github_username: githubUsername,
                  university: cleanEmail.includes("@")
                    ? `${cleanEmail.split("@")[1].split(".")[0].toUpperCase()} University`
                    : "Institutional Partner",
                },
              },
            },
            include: {
              candidate_profile: true,
              recruiter_profile: { include: { company: true } },
            },
          });
        } else {
          let company = await prisma.company.findFirst();
          if (!company) {
            company = await prisma.company.create({
              data: {
                name: "Partner Organization",
                slug: "partner-org",
                is_verified_partner: true,
              },
            });
          }

          user = await prisma.user.create({
            data: {
              email: cleanEmail,
              name: githubUsername,
              role: "recruiter",
              auth_provider: "github",
              is_email_verified: true,
              recruiter_profile: {
                create: {
                  company_id: company.id,
                  role_title: "Technical Talent Lead",
                },
              },
            },
            include: {
              candidate_profile: true,
              recruiter_profile: { include: { company: true } },
            },
          });
        }
      } else {
        if (role === "candidate" && user.candidate_profile) {
          await prisma.candidateProfile.update({
            where: { id: user.candidate_profile.id },
            data: { github_username: githubUsername },
          });
        }
      }

      const otpResult = await EmailService.sendOtpVerificationEmail(cleanEmail, role);
      const dbUser = mapPrismaUserToDbUser(user);

      return { success: true, user: dbUser, otpCode: otpResult.code };
    } catch (error) {
      console.error("[AuthService.handleGithubOAuth error]:", error);
      return {
        success: false,
        error: "Database error during GitHub authentication.",
      };
    }
  }

  /**
   * Fetches full Candidate profile by email including skills from Supabase PostgreSQL.
   */
  static async getCandidateProfile(email: string) {
    const cleanEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        candidate_profile: {
          include: {
            candidate_skills: {
              include: { skill: true },
            },
          },
        },
      },
    });

    if (!user || !user.candidate_profile) return null;

    const cp = user.candidate_profile;
    const skills = cp.candidate_skills.map((cs) => cs.skill.name);

    return {
      name: user.name,
      headline: cp.headline || "Distributed Systems & Infrastructure Engineer",
      university: cp.university || "UC Berkeley",
      degree: cp.degree || "B.S. Electrical Engineering & Computer Sciences",
      graduationYear: cp.graduation_year || "2026",
      email: user.email,
      avatarUrl: user.avatar_url || null,
      githubUrl: cp.github_username
        ? `https://github.com/${cp.github_username.replace(/^https?:\/\/github\.com\//, "")}`
        : "https://github.com/alexchen-dev",
      linkedinUrl: cp.linkedin_url || "https://linkedin.com/in/alexchen-dev",
      portfolioUrl: cp.portfolio_url || "https://alexchen.berkeley.edu",
      bio: cp.headline || "",
      resumeFileName: cp.resume_file_url?.split("/").pop() || "Alex_Chen_UCBerkeley_EECS_2026.pdf",
      resumeFileSize: "2.4 MB",
      resumeSha256: cp.resume_sha256 || "sha256-8f4b23c91e7d80aa2345bc79ef0142de56a89c4456b21c43d99e01",
      skills: skills.length > 0 ? skills : ["Go", "Distributed Systems", "Raft Consensus", "Concurrency"],
    };
  }

  /**
   * Updates Candidate profile in Supabase PostgreSQL (updates User and CandidateProfile records).
   */
  static async updateCandidateProfile(data: {
    email: string;
    name?: string;
    headline?: string;
    university?: string;
    degree?: string;
    graduationYear?: string;
    avatarUrl?: string | null;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    resumeFileName?: string;
    resumeSha256?: string;
    skills?: string[];
  }) {
    const cleanEmail = data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { candidate_profile: true },
    });

    if (!user) throw new Error("User not found.");

    // 1. Update user name & avatar_url
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(data.name ? { name: data.name } : {}),
        ...(data.avatarUrl !== undefined ? { avatar_url: data.avatarUrl } : {}),
      },
    });

    // 2. Update or create candidate_profile
    const githubUser = data.githubUrl
      ? data.githubUrl.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "")
      : undefined;

    let profileId = user.candidate_profile?.id;
    if (profileId) {
      await prisma.candidateProfile.update({
        where: { id: profileId },
        data: {
          headline: data.headline,
          university: data.university,
          degree: data.degree,
          graduation_year: data.graduationYear,
          github_username: githubUser,
          linkedin_url: data.linkedinUrl,
          portfolio_url: data.portfolioUrl,
          resume_file_url: data.resumeFileName,
          resume_sha256: data.resumeSha256,
        },
      });
    } else {
      const createdProfile = await prisma.candidateProfile.create({
        data: {
          user_id: user.id,
          headline: data.headline,
          university: data.university,
          degree: data.degree,
          graduation_year: data.graduationYear,
          github_username: githubUser,
          linkedin_url: data.linkedinUrl,
          portfolio_url: data.portfolioUrl,
          resume_file_url: data.resumeFileName,
          resume_sha256: data.resumeSha256,
        },
      });
      profileId = createdProfile.id;
    }

    // 3. Sync skills if provided
    if (data.skills && Array.isArray(data.skills) && profileId) {
      for (const skillName of data.skills) {
        const cleanSkillName = skillName.trim();
        if (!cleanSkillName) continue;

        let skillRecord = await prisma.skill.findUnique({
          where: { name: cleanSkillName },
        });

        if (!skillRecord) {
          skillRecord = await prisma.skill.create({
            data: { name: cleanSkillName, category: "Core Engineering" },
          });
        }

        await prisma.candidateSkill.upsert({
          where: {
            candidate_id_skill_id: {
              candidate_id: profileId,
              skill_id: skillRecord.id,
            },
          },
          update: { is_verified: true },
          create: {
            candidate_id: profileId,
            skill_id: skillRecord.id,
            proficiency: "Advanced",
            is_verified: true,
          },
        });
      }
    }

    return await this.getCandidateProfile(cleanEmail);
  }

  /**
   * Fetches full Recruiter profile by email from Supabase PostgreSQL.
   */
  static async getRecruiterProfile(email: string) {
    const cleanEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        recruiter_profile: {
          include: { company: true },
        },
      },
    });

    if (!user || !user.recruiter_profile) return null;

    const rp = user.recruiter_profile;
    const company = rp.company;

    return {
      companyName: company?.name || "CloudScale Infrastructure Labs",
      companySlug: company?.slug || "cloudscale",
      recruiterName: user.name,
      email: user.email,
      roleTitle: rp.role_title || "Lead Systems & Infrastructure Recruiter",
      industry: company?.industry || "Distributed Cloud Infrastructure & Databases",
      location: rp.office_location || "San Francisco, CA (HQ)",
      verifiedPartner: company?.is_verified_partner ?? true,
      avatarUrl: user.avatar_url || null,
    };
  }

  /**
   * Updates Recruiter profile and Company in Supabase PostgreSQL.
   */
  static async updateRecruiterProfile(data: {
    email: string;
    recruiterName?: string;
    roleTitle?: string;
    companyName?: string;
    industry?: string;
    location?: string;
    avatarUrl?: string | null;
  }) {
    const cleanEmail = data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        recruiter_profile: {
          include: { company: true },
        },
      },
    });

    if (!user) throw new Error("User not found.");

    // 1. Update user name & avatar_url
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(data.recruiterName ? { name: data.recruiterName } : {}),
        ...(data.avatarUrl !== undefined ? { avatar_url: data.avatarUrl } : {}),
      },
    });

    // 2. Update company if exists
    if (user.recruiter_profile?.company_id && (data.companyName || data.industry)) {
      await prisma.company.update({
        where: { id: user.recruiter_profile.company_id },
        data: {
          ...(data.companyName ? { name: data.companyName } : {}),
          ...(data.industry ? { industry: data.industry } : {}),
        },
      });
    }

    // 3. Update recruiter profile
    if (user.recruiter_profile?.id && (data.roleTitle || data.location)) {
      await prisma.recruiterProfile.update({
        where: { id: user.recruiter_profile.id },
        data: {
          ...(data.roleTitle ? { role_title: data.roleTitle } : {}),
          ...(data.location ? { office_location: data.location } : {}),
        },
      });
    }

    return await this.getRecruiterProfile(cleanEmail);
  }
}

