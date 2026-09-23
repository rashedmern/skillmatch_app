import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/server/services/authService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role = "candidate" } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const result = await AuthService.loginWithCredentials(email, password, role);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: result.user,
        message: "OTP verification code dispatched to email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/auth/login error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
