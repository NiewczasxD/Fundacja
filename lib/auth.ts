import { NextRequest } from "next/server";
import * as bcrypt from "bcryptjs";
import { getAdminByUsername } from "./db";

// Dane logowania z env – używane tylko gdy brak adminów w bazie (fallback)
const ENV_ADMIN_USERNAME = process.env.ADMIN_USERNAME || "m.niewczas@ivel.pl";
const ENV_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Ziemniak10";

export async function login(username: string, password: string): Promise<boolean> {
  // Najpierw sprawdź admina z pliku (baza administratorów)
  const admin = getAdminByUsername(username);
  if (admin) {
    return bcrypt.compareSync(password, admin.passwordHash);
  }
  // Fallback: logowanie z env (dla pierwszego admina lub migracji)
  return (
    username === ENV_ADMIN_USERNAME &&
    password === ENV_ADMIN_PASSWORD
  );
}

export async function createSession(): Promise<string> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  return sessionId;
}

export async function verifySession(sessionId: string | undefined): Promise<boolean> {
  if (!sessionId) return false;
  // W produkcji sprawdź sesję w bazie danych lub cache
  // Tutaj używamy prostego sprawdzenia formatu
  return sessionId.startsWith("session_");
}

export function getSessionFromRequest(request: NextRequest): string | null {
  return request.cookies.get("admin_session")?.value || null;
}
