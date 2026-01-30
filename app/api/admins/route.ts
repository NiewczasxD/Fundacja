import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { getAdmins, getAdminByUsername, createAdmin } from "@/lib/db";
import { getSessionFromRequest, verifySession } from "@/lib/auth";

/** Lista administratorów (bez hasła) – tylko dla zalogowanego admina */
export async function GET(request: NextRequest) {
  try {
    const sessionId = getSessionFromRequest(request);
    const isValid = await verifySession(sessionId);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = getAdmins();
    const list = admins.map((a) => ({
      id: a.id,
      username: a.username,
      createdAt: a.createdAt,
    }));
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

/** Dodanie nowego administratora – tylko dla zalogowanego admina */
export async function POST(request: NextRequest) {
  try {
    const sessionId = getSessionFromRequest(request);
    const isValid = await verifySession(sessionId);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const username = (body.username as string)?.trim();
    const password = body.password as string;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = getAdminByUsername(username);
    if (existing) {
      return NextResponse.json(
        { error: "Admin with this username already exists" },
        { status: 409 }
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const admin = createAdmin({ username, passwordHash });
    return NextResponse.json(
      { id: admin.id, username: admin.username, createdAt: admin.createdAt },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
