import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Password stored server-side only (not NEXT_PUBLIC_)
const ADMIN_PASS = process.env.ADMIN_PASS || "arabesque2025";

// Simple constant-time comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !safeCompare(password, ADMIN_PASS)) {
      // Add small delay to slow brute force
      await new Promise(r => setTimeout(r, 500));
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    // Set secure HTTP-only cookie (not readable by JS)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
