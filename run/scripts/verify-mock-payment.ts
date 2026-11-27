/**
 * Verify the mock checkout flow actually fulfilled the order:
 * PaymentOrder → paid, Subscription → premium, CreditTransaction → bonus.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  datasources: { db: { url: "postgresql://postgres:postgres@127.0.0.1:5432/nextapp" } },
});

async function main() {
  const order = await db.paymentOrder.findFirst({
    orderBy: { createdAt: "desc" },
  });
  console.log("ORDER:", {
    kind: order?.kind,
    referenceId: order?.referenceId,
    status: order?.status,
    paidAt: order?.paidAt?.toISOString(),
    session: order?.stripeCheckoutSessionId,
  });

  if (order) {
    const sub = await db.subscription.findUnique({ where: { userId: order.userId } });
    console.log("SUBSCRIPTION:", {
      tier: sub?.tier,
      status: sub?.status,
      periodEnd: sub?.currentPeriodEnd?.toISOString(),
    });

    const tx = await db.creditTransaction.findFirst({
      where: { referenceId: order.id },
    });
    console.log("CREDIT TX:", {
      type: tx?.type,
      amount: tx?.amount,
      description: tx?.description,
    });
  }
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
