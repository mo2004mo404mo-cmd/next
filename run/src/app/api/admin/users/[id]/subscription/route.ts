import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "@/lib/api-handler";
import { badRequest, notFound } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

/**
 * Migrated from throw-based requireAdmin() to apiHandler({ requiredRole: 'admin' }):
 * - 401/403 now returned by the wrapper (was incorrectly returning 500 for auth failures via the catch block)
 * - try/catch eliminated — wrapper handles uncaught errors
 * - 400/404 boilerplate replaced with badRequest()/notFound() helpers
 */
export const PUT = apiHandler<{ id: string }>(
  async (request: NextRequest, ctx) => {
    const { id } = ctx.params;
    const body = await request.json();

    const { tier, status, currentPeriodEnd } = body;

    // Validate tier
    const validTiers = ["free", "premium", "pro"];
    if (tier && !validTiers.includes(tier)) {
      return badRequest(`Invalid tier. Must be one of: ${validTiers.join(", ")}`);
    }

    // Validate status
    const validStatuses = ["active", "past_due", "cancelled", "expired"];
    if (status && !validStatuses.includes(status)) {
      return badRequest(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    // Check user exists
    const user = await db.user.findUnique({
      where: { id },
      include: { subscription: true },
    });

    if (!user) return notFound("User not found");

    // Build update data
    const updateData: any = {};
    if (tier) updateData.tier = tier;
    if (status) updateData.status = status;
    if (currentPeriodEnd) updateData.currentPeriodEnd = new Date(currentPeriodEnd);

    let subscription;

    if (user.subscription) {
      // Update existing subscription
      subscription = await db.subscription.update({
        where: { userId: id },
        data: updateData,
      });
    } else {
      // Create subscription if it doesn't exist
      subscription = await db.subscription.create({
        data: {
          userId: id,
          tier: tier || "free",
          status: status || "active",
          currentPeriodEnd: currentPeriodEnd
            ? new Date(currentPeriodEnd)
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // default 30 days
        },
      });
    }

    return NextResponse.json({
      message: "Subscription updated successfully",
      subscription: {
        id: subscription.id,
        userId: subscription.userId,
        tier: subscription.tier,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt,
      },
    });
  },
  { requiredRole: "admin" }
);
