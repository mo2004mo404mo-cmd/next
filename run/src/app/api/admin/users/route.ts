import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { db } from "@/lib/db";

/**
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 */
export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";
  const tier = searchParams.get("tier") || "";
  const status = searchParams.get("status") || "";

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (tier) {
    where.subscription = { tier };
  }

  if (status) {
    where.status = status;
  }

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        bio: true,
        medicalSchool: true,
        graduationYear: true,
        specialty: true,
        country: true,
        onboardingCompleted: true,
        status: true,
        suspendedUntil: true,
        suspendedReason: true,
        bannedAt: true,
        bannedReason: true,
        lastActiveAt: true,
        createdAt: true,
        updatedAt: true,
        subscription: {
          select: {
            id: true,
            tier: true,
            status: true,
            currentPeriodEnd: true,
          },
        },
        creditWallet: {
          select: {
            id: true,
            balance: true,
            totalEarned: true,
            totalSpent: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.user.count({ where }),
  ]);

  // Transform users to flat format expected by frontend
  const flatUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    image: u.image,
    role: u.role,
    tier: u.subscription?.tier || "free",
    credits: u.creditWallet?.balance || 0,
    status: u.status,
    suspendedUntil: u.suspendedUntil,
    suspendedReason: u.suspendedReason,
    bannedAt: u.bannedAt,
    bannedReason: u.bannedReason,
    lastActiveAt: u.lastActiveAt,
    createdAt: u.createdAt,
  }));

  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    users: flatUsers,
    total,
    page,
    totalPages,
  });
}, { requiredRole: "admin" });
