import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/server/services/emailService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Email and 6-digit OTP code are required." },
        { status: 400 }
      );
    }

    const result = await EmailService.verifyOtpCode(email, code);

    if (!result.isValid) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Identity verified successfully. Session authorized.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/auth/verify-otp error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
