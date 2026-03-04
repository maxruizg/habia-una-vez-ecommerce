import { redirect } from "react-router";
import { getSession, commitSession, destroySession } from "./session.server";

const ADMIN_SESSION_KEY = "adminUserId";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@habiaunavez.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function getAdminId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);
  return session.get(ADMIN_SESSION_KEY);
}

export async function getAdmin(request: Request) {
  const adminId = await getAdminId(request);
  if (!adminId) return null;
  return { id: adminId, email: ADMIN_EMAIL, name: "Admin" };
}

export async function requireAdmin(request: Request) {
  const admin = await getAdmin(request);
  if (!admin) {
    throw redirect("/admin/login");
  }
  return admin;
}

export async function login(email: string, password: string) {
  if (email !== ADMIN_EMAIL) return null;
  if (!ADMIN_PASSWORD) return null;
  if (password !== ADMIN_PASSWORD) return null;

  return { id: "admin-1", email: ADMIN_EMAIL, name: "Admin" };
}

export async function createAdminSession(adminId: string, request: Request) {
  const session = await getSession(request);
  session.set(ADMIN_SESSION_KEY, adminId);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
