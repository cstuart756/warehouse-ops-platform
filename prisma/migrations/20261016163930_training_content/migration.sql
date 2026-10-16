-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "completionChecks" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "expectedMinutes" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "objective" TEXT,
ADD COLUMN     "requiresConfirmation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "requiresSupervisorSignOff" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresVideo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "warnings" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "estimatedMinutes" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "learningObjectives" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "passMark" INTEGER NOT NULL DEFAULT 80,
ADD COLUMN     "renewalMonths" INTEGER,
ADD COLUMN     "supervisorSignOffRequired" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "AssessmentQuestion" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "question" TEXT NOT NULL,
    "options" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "correctOption" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "AssessmentQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AssessmentQuestion_workflowId_idx" ON "AssessmentQuestion"("workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_code_key" ON "Workflow"("code");

-- AddForeignKey
ALTER TABLE "AssessmentQuestion" ADD CONSTRAINT "AssessmentQuestion_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

