/** Verify the mock checkout flow actually fulfilled the order (same client as the app). */
const { config } = require("dotenv");
config();
const { PrismaClient } = require("/home/z/my-project/src/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const envUrl = process.env.DATABASE_URL;
const fileUrl = process.env.DATABASE_URL; // dotenv already loaded .env
const connectionString =
  envUrl && envUrl.startsWith("postgres") ? envUrl : fileUrl ?? envUrl;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  const order = await db.paymentOrder.findFirst({ orderBy: { createdAt: "desc" } });
  console.log("ORDER:", {
    kind: order?.kind,
    referenceId: order?.referenceId,
    status: order?.status,
    paidAt: order?.paidAt && order.paidAt.toISOString(),
    session: order?.stripeCheckoutSessionId,
  });
  if (order) {
    const sub = await db.subscription.findUnique({ where: { userId: order.userId } });
    console.log("SUBSCRIPTION:", {
      tier: sub?.tier,
      status: sub?.status,
      periodEnd: sub?.currentPeriodEnd && sub.currentPeriodEnd.toISOString(),
    });
    const tx = await db.creditTransaction.findFirst({ where: { referenceId: order.id } });
    console.log("CREDIT TX:", { type: tx?.type, amount: tx?.amount, desc: tx?.description });
  }
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
