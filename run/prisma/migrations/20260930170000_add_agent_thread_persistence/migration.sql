-- Add durable chat thread persistence used by the v2 agent endpoint.
CREATE TABLE "AgentThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New conversation',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentThread_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgentThreadMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "toolCalls" TEXT,
    "toolResults" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentThreadMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AgentThread_userId_updatedAt_idx" ON "AgentThread"("userId", "updatedAt");
CREATE INDEX "AgentThreadMessage_threadId_createdAt_idx" ON "AgentThreadMessage"("threadId", "createdAt");

ALTER TABLE "AgentThreadMessage"
ADD CONSTRAINT "AgentThreadMessage_threadId_fkey"
FOREIGN KEY ("threadId") REFERENCES "AgentThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;