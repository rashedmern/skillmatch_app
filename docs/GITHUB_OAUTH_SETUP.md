# GitHub OAuth App Professional Branding & Consent Screen Setup

This guide provides exact step-by-step instructions to ensure the GitHub OAuth authorization consent screen displays strictly as **"SkillMatch"** with professional branding, and completely eliminates personal developer names (`"Rashed Molla Antor"`), personal GitHub usernames (`@rashedmern`), and personal avatars.

---

## 1. Why Did the Personal Name & Avatar Appear?

When a user initiates the GitHub login handshake (`signIn("github")`), GitHub opens the OAuth authorization screen:

```text
+-------------------------------------------------------------+
|                                                             |
|           [ Avatar ]               [ Developer Avatar ]     |
|          Rashed Molla Antor            rashedmern           |
|                                                             |
|       Authorize Rashed Molla Antor                          |
|       by @rashedmern                                        |
|                                                             |
|   Rashed Molla Antor would like permission to:              |
|     - Verify your GitHub identity                           |
|     - Know which resources you can access                   |
|                                                             |
|             [ Authorize rashedmern ]                        |
|                                                             |
+-------------------------------------------------------------+
```

### The Root Causes:
1. **Application Name setting**: If the OAuth app was created with a personal name or default name, GitHub puts that name in the primary heading (`Authorize Rashed Molla Antor`).
2. **Personal Account Ownership**: In GitHub's security architecture, any OAuth app created under a **Personal User Account** (`github.com/settings/developers`) **always** shows the owner's handle (`by @rashedmern`) and personal profile avatar. GitHub does not allow suppressing the owner attribution for personal accounts.
3. **Missing Logo**: When no logo has been uploaded, GitHub displays an ugly fallback identicon (`/identicons/app/oauth_app/...`) instead of the brand icon.

---

## 2. Before vs. After Comparison

| Element | ❌ Personal Account State | ✅ Professional Organization State |
| :--- | :--- | :--- |
| **Main App Name** | `Rashed Molla Antor` (or generic) | **`SkillMatch`** |
| **Owner Attribution** | `by @rashedmern` | **`by @SkillMatchOfficial`** (or `@SkillMatch`) |
| **App Logo** | Personal picture or identicon | **SkillMatch Oceanic Squircle Logo** (Mint/Teal) |
| **Authorize Button** | `Authorize rashedmern` | **`Authorize SkillMatch`** |
| **Domain Trust** | "Unverified" | **"Verified Domain" (Optional green badge)** |

---

## 3. Step 1: Update Application Name & Metadata

1. Open your browser and go to your GitHub Developer Settings:
   👉 **[https://github.com/settings/developers](https://github.com/settings/developers)**
2. Under **OAuth Apps**, click your SkillMatch application (the one matching `GITHUB_CLIENT_ID`).
3. Fill in the fields with the exact values below:

| Field | Value to Enter | Notes |
| :--- | :--- | :--- |
| **Application name** | `SkillMatch` | Strictly product name without developer names |
| **Homepage URL** | `https://your-domain.vercel.app`<br>*(or `http://localhost:3000` for dev)* | Canonical app URL |
| **Application description** | `SkillMatch — Autonomous Skill Verification and Candidate Matching Platform for CSE Talent.` | Displays on consent screen |
| **Authorization callback URL** | `http://localhost:3000/api/auth/callback/github`<br>*(or production URL)* | NextAuth callback route |

4. **Upload Application Logo**:
   - In the **Application logo** section, click **Upload new logo**.
   - Select the pre-generated high-resolution square brand logo located in this project:
     📁 `skillmatch_app/public/images/skillmatch-oauth-logo.png` (512x512 PNG, 44 KB).
   - Crop/Save the badge.
5. Click **Update application**.

---

## 4. Step 2: Eliminate Personal Name by Transferring to a Free GitHub Organization

> [!IMPORTANT]
> **This is the critical step.** As long as the OAuth App is owned by your personal account `@rashedmern`, GitHub will always print `"by @rashedmern"`. Transferring it to a GitHub Organization completely replaces personal information with your official brand handle and logo!
>
> 💡 **Good news:** Transferring preserves the **exact same Client ID and Client Secret**! Your application code and `.env.local` will NOT break.

### Part A: Create a Free GitHub Organization (Takes 30 seconds)
1. Go to: **[https://github.com/organizations/plan](https://github.com/organizations/plan)**
2. Under the **Free** column ($0/month), click **Create a free organization**.
3. Set your Organization details:
   - **Organization account name**: e.g. `SkillMatchOfficial` or `SkillMatch-App` or `SkillMatch-Platform`
   - **Contact email**: your email or project email
   - **My organization belongs to**: Select "My personal account"
4. Click **Next** and complete the quick creation.
5. (Optional) Set the organization profile picture to `skillmatch-oauth-logo.png`.

### Part B: Transfer the OAuth App to the Organization
1. Return to your OAuth App settings:
   👉 **[https://github.com/settings/developers](https://github.com/settings/developers)** -> Click **SkillMatch**.
2. Scroll to the very bottom to the **Danger zone** section.
3. Click the **Transfer ownership** button.
4. In the transfer modal:
   - Type the name of your new Organization (e.g. `SkillMatchOfficial`).
   - Type your application name to confirm.
   - Click **Transfer**.
5. Once confirmed, the app is now owned by `@SkillMatchOfficial`.

---

## 5. What Users Will See Now

The GitHub consent screen will now look like this:

```text
+-------------------------------------------------------------+
|                                                             |
|           [ SkillMatch Logo ]          [ Organization ]     |
|              (Dark Teal)             @SkillMatchOfficial    |
|                                                             |
|       Authorize SkillMatch                                  |
|       by @SkillMatchOfficial                                |
|                                                             |
|   SkillMatch would like permission to:                      |
|     - Verify your GitHub identity                           |
|     - Access public repositories (read:user, user:email)    |
|                                                             |
|             [ Authorize SkillMatchOfficial ]                |
|                                                             |
+-------------------------------------------------------------+
```

Zero personal developer names, zero personal usernames, and pure product branding.

---

## 6. Callback URL Reference Matrix

When configuring callback URLs in your OAuth App:

| Environment | Homepage URL | Authorization callback URL |
| :--- | :--- | :--- |
| **Local Development** | `http://localhost:3000` | `http://localhost:3000/api/auth/callback/github` |
| **Vercel Preview** | `https://your-branch.vercel.app` | `https://your-branch.vercel.app/api/auth/callback/github` |
| **Production Domain** | `https://your-domain.vercel.app` | `https://your-domain.vercel.app/api/auth/callback/github` |

> [!TIP]
> If you test both locally and on Vercel, you can either:
> 1. Create two separate OAuth Apps in GitHub (e.g., `SkillMatch (Development)` and `SkillMatch (Production)`), OR
> 2. Update the Authorization callback URL whenever switching focus between local and production.

---

## 7. Optional Enterprise Polish: Verified Domain Badge

To display the green **"Verified domain"** badge on your GitHub consent screen:
1. In your GitHub Organization (`https://github.com/organizations/<YOUR_ORG>/settings/profile`), click **Verified and approved domains**.
2. Click **Add a domain** and enter your production custom domain (e.g., `skillmatch.io`).
3. Add the TXT verification record to your DNS provider.
4. Once verified, GitHub awards the verified domain badge directly above the OAuth consent screen!
