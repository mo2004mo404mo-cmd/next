import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { badRequest, notFound } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

/**
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 * - `const admin = await requireAdmin()` replaced with `ctx.userId` from the wrapper context
 * - 400/404 boilerplate replaced with badRequest()/notFound() helpers
 * - Note: the 409 (email conflict) and self-demote/self-delete 400 responses are preserved
 *   verbatim because they carry domain-specific error messages that the frontend depends on
 */
export const GET = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;

    const user = await db.user.findUnique({
      where: { id },
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
        createdAt: true,
        updatedAt: true,
        subscription: {
          select: {
            id: true,
            tier: true,
            status: true,
            currentPeriodEnd: true,
            createdAt: true,
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
        _count: {
          select: {
            usageRecords: true,
            bookmarks: true,
            notes: true,
            studySessions: true,
            examAttempts: true,
            adImpressions: true,
          },
        },
      },
    });

    if (!user) return notFound("User not found");

    return NextResponse.json({ user });
  },
  { requiredRole: "admin" }
);

export const PUT = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;
    const body = await request.json();

    // Check user exists
    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) return notFound("User not found");

    // Prevent admin from demoting themselves
    if (existingUser.id === ctx.userId && body.role && body.role !== "admin") {
      return badRequest("Cannot demote yourself from admin");
    }

    // Build update data - only allow specific fields
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) {
      // Check if email is already taken by another user
      if (body.email !== existingUser.email) {
        const emailTaken = await db.user.findUnique({
          where: { email: body.email },
        });
        if (emailTaken) {
          return NextResponse.json(
            { error: "Email already in use" },
            { status: 409 }
          );
        }
      }
      updateData.email = body.email;
    }
    if (body.role !== undefined) {
      const validRoles = ["student", "educator", "admin"];
      if (!validRoles.includes(body.role)) {
        return badRequest(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
      }
      updateData.role = body.role;
    }
    if (body.bio !== undefined) updateData.bio = body.bio;
    if (body.medicalSchool !== undefined) updateData.medicalSchool = body.medicalSchool;
    if (body.graduationYear !== undefined) updateData.graduationYear = body.graduationYear;
    if (body.specialty !== undefined) updateData.specialty = body.specialty;
    if (body.country !== undefined) updateData.country = body.country;
    if (body.onboardingCompleted !== undefined) updateData.onboardingCompleted = body.onboardingCompleted;

    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
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
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  },
  { requiredRole: "admin" }
);

export const DELETE = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;

    // Check user exists
    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) return notFound("User not found");

    // Prevent admin from deleting themselves
    if (existingUser.id === ctx.userId) {
      return badRequest("Cannot delete your own account");
    }

    // Delete user (cascade will handle related records)
    await db.user.delete({ where: { id } });

    return NextResponse.json({
      message: "User deleted successfully",
      deletedUserId: id,
    });
  },
  { requiredRole: "admin" }
);
