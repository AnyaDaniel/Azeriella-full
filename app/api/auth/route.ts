import { NextResponse } from "next/server";
import { verifyAdmin, createAdminSession, clearAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password, action } = await req.json();
    
    console.log('Auth attempt:', { username, action, hasPassword: !!password });
    
    if (action === "logout") {
      await clearAdminSession();
      return NextResponse.json({ success: true });
    }
    
    const isValid = await verifyAdmin(username, password);
    
    console.log('Verification result:', isValid);
    
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
