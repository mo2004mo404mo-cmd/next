-- DropIndex
DROP INDEX "UserApiKey_userId_providerId_key";

-- AlterTable
ALTER TABLE "AgentSkill" ADD COLUMN     "lastEditedBy" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "AgentThreadMessage" ADD COLUMN     "metadata" TEXT;

-- AlterTable
ALTER TABLE "FlashcardProgress" ADD COLUMN     "fsrsDifficulty" DOUBLE PRECISION NOT NULL DEFAULT 5,
ADD COLUMN     "lapses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reps" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stability" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "state" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "GroupQuestion" ADD COLUMN     "audioUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hotspots" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "labPanel" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "modelUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pcgSpec" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "structureTags" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "videoUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "KnowledgeChunk" ADD COLUMN     "contextSummary" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "embeddingModel" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "KnowledgeSource" ADD COLUMN     "fileKind" TEXT NOT NULL DEFAULT 'document';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "attemptsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "blueprintOrgan" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "blueprintTask" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "citations" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "difficultyP" DOUBLE PRECISION NOT NULL DEFAULT -1,
ADD COLUMN     "discrimination" DOUBLE PRECISION NOT NULL DEFAULT -1,
ADD COLUMN     "hotspots" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "knowledgeSourceIds" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "labPanel" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "modelUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pcgSpec" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reviewNotes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reviewStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "structureTags" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "videoSceneEnd" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "videoSceneStart" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "videoSourceId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "UserApiKey" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "RealtimeVoiceKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "ciphertext" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "authTag" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RealtimeVoiceKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaSearchCache" (
    "id" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'sound',
    "resultJson" TEXT NOT NULL DEFAULT 'null',
    "hits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaSearchCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedAnswer" TEXT NOT NULL DEFAULT '',
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "confidence" TEXT NOT NULL DEFAULT '',
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "mode" TEXT NOT NULL DEFAULT 'bank',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiCallLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "providerId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "stage" TEXT,
    "status" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER,
    "error" TEXT,
    "endpointRowId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiCallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentSkillRevision" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reason" TEXT,
    "editedBy" TEXT NOT NULL DEFAULT 'system',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentSkillRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoScene" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "sceneIdx" INTEGER NOT NULL,
    "startSec" DOUBLE PRECISION NOT NULL,
    "endSec" DOUBLE PRECISION NOT NULL,
    "detection" TEXT NOT NULL DEFAULT 'scene-cut',
    "description" TEXT NOT NULL DEFAULT '',
    "transcript" TEXT NOT NULL DEFAULT '',
    "embedding" BYTEA,
    "embeddingModel" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RagQueryLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "sourceIds" TEXT NOT NULL DEFAULT '[]',
    "queriesJson" TEXT NOT NULL DEFAULT '[]',
    "retrievedJson" TEXT NOT NULL DEFAULT '[]',
    "topK" INTEGER NOT NULL DEFAULT 8,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RagQueryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportExtraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL DEFAULT 'pasted text',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "error" TEXT,
    "text" TEXT NOT NULL,
    "maxQuestions" INTEGER NOT NULL DEFAULT 2000,
    "questionsJson" TEXT,
    "rawCount" INTEGER,
    "droppedChunks" INTEGER,
    "progressDone" INTEGER NOT NULL DEFAULT 0,
    "progressTotal" INTEGER NOT NULL DEFAULT 0,
    "imagesJson" TEXT,
    "chunkResults" TEXT,
    "passCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportExtraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExplanationJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "error" TEXT,
    "scope" TEXT NOT NULL DEFAULT 'missing',
    "overwrite" BOOLEAN NOT NULL DEFAULT false,
    "questionIds" TEXT NOT NULL DEFAULT '[]',
    "total" INTEGER NOT NULL DEFAULT 0,
    "written" INTEGER,
    "failed" INTEGER,
    "progressDone" INTEGER NOT NULL DEFAULT 0,
    "progressTotal" INTEGER NOT NULL DEFAULT 0,
    "passCount" INTEGER NOT NULL DEFAULT 0,
    "chunkResults" TEXT,
    "metaJson" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExplanationJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveKitRoomMap" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveKitRoomMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OsceSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scenario" TEXT NOT NULL DEFAULT '{}',
    "transcript" TEXT NOT NULL DEFAULT '[]',
    "result" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "durationSec" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OsceSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RealtimeVoiceKey_userId_idx" ON "RealtimeVoiceKey"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RealtimeVoiceKey_userId_provider_key" ON "RealtimeVoiceKey"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "MediaSearchCache_cacheKey_key" ON "MediaSearchCache"("cacheKey");

-- CreateIndex
CREATE INDEX "MediaSearchCache_kind_idx" ON "MediaSearchCache"("kind");

-- CreateIndex
CREATE INDEX "MediaSearchCache_expiresAt_idx" ON "MediaSearchCache"("expiresAt");

-- CreateIndex
CREATE INDEX "QuestionAttempt_userId_createdAt_idx" ON "QuestionAttempt"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionAttempt_questionId_idx" ON "QuestionAttempt"("questionId");

-- CreateIndex
CREATE INDEX "QuestionAttempt_userId_isCorrect_idx" ON "QuestionAttempt"("userId", "isCorrect");

-- CreateIndex
CREATE INDEX "QuestionAttempt_mode_idx" ON "QuestionAttempt"("mode");

-- CreateIndex
CREATE INDEX "AiCallLog_userId_createdAt_idx" ON "AiCallLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AiCallLog_userId_status_createdAt_idx" ON "AiCallLog"("userId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "AiCallLog_createdAt_idx" ON "AiCallLog"("createdAt");

-- CreateIndex
CREATE INDEX "AgentSkillRevision_skillId_createdAt_idx" ON "AgentSkillRevision"("skillId", "createdAt");

-- CreateIndex
CREATE INDEX "VideoScene_sourceId_sceneIdx_idx" ON "VideoScene"("sourceId", "sceneIdx");

-- CreateIndex
CREATE INDEX "VideoScene_sourceId_startSec_idx" ON "VideoScene"("sourceId", "startSec");

-- CreateIndex
CREATE INDEX "RagQueryLog_userId_createdAt_idx" ON "RagQueryLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ImportExtraction_userId_status_idx" ON "ImportExtraction"("userId", "status");

-- CreateIndex
CREATE INDEX "ImportExtraction_status_updatedAt_idx" ON "ImportExtraction"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "ExplanationJob_userId_status_idx" ON "ExplanationJob"("userId", "status");

-- CreateIndex
CREATE INDEX "ExplanationJob_status_updatedAt_idx" ON "ExplanationJob"("status", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LiveKitRoomMap_roomName_key" ON "LiveKitRoomMap"("roomName");

-- CreateIndex
CREATE INDEX "LiveKitRoomMap_chatRoomId_idx" ON "LiveKitRoomMap"("chatRoomId");

-- CreateIndex
CREATE INDEX "OsceSession_userId_createdAt_idx" ON "OsceSession"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Question_blueprintOrgan_idx" ON "Question"("blueprintOrgan");

-- CreateIndex
CREATE INDEX "Question_reviewStatus_idx" ON "Question"("reviewStatus");

-- CreateIndex
CREATE INDEX "UserApiKey_userId_providerId_idx" ON "UserApiKey"("userId", "providerId");

-- AddForeignKey
ALTER TABLE "RealtimeVoiceKey" ADD CONSTRAINT "RealtimeVoiceKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentSkillRevision" ADD CONSTRAINT "AgentSkillRevision_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "AgentSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoScene" ADD CONSTRAINT "VideoScene_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "KnowledgeSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OsceSession" ADD CONSTRAINT "OsceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
