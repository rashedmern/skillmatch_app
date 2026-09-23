import { redirect } from "next/navigation";

interface VerifyOtpRedirectProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyOtpRedirectPage({ searchParams }: VerifyOtpRedirectProps) {
  const resolvedParams = await searchParams;
  const queryString = new URLSearchParams();

  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryString.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, v));
    }
  });

  const target = queryString.toString()
    ? `/auth/verify-otp?${queryString.toString()}`
    : "/auth/verify-otp";

  redirect(target);
}
