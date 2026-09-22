import { NextResponse } from "next/server";
import { db } from "@/server/db/client";

export async function GET() {
  return NextResponse.json(
    {
      status: "online",
      timestamp: new Date().toISOString(),
      database: db.isConnected() ? "healthy" : "disconnected",
      version: "1.0.0",
      architecture: "Oceanic Intelligence / Next.js 16 App Router",
    },
    { status: 200 }
  );
}
