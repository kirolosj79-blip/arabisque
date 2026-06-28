import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuth = session?.value === "authenticated";
  return NextResponse.json({ authenticated: isAuth });
}
