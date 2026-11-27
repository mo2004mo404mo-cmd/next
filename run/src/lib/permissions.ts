// lib/permissions.ts

import { auth } from "@/auth";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function requireRole(
  roles: Array<"USER" | "MANAGER" | "admin">
) {
  const session = await requireAuth();
  
  if (!roles.includes(session.user.role)) {
    throw new Error("Forbidden");
  }

  return session;
}
