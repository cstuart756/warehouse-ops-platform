const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Load all workflow modules
// Add new modules here as you create them
// ---------------------------------------------------------------------------
const workflows = [
  require('./workflows/01-safety-induction'),
  require('./workflows/02-goods-in'),
  require('./workflows/03-put-away'),
  require('./workflows/04-picking'),
  // require('./workflows/05-packing'),
  // require('./workflows/06-dispatch'),
  // require('./workflows/07-cycle-count'),
  // require('./workflows/08-damaged-goods'),
]

// ---------------------------------------------------------------------------
// Seed runner
// ---------------------------------------------------------------------------
async function main() {
  console.log('🌱 Starting seed...\n')

  // ----- Clean existing data in safe order (respecting foreign keys) -----
  console.log('🗑️  Clearing existing workflow data...')
  await prisma.progress.deleteMany()
  await prisma.task.deleteMany()
  await prisma.assessmentQuestion.deleteMany()
  await prisma.step.deleteMany()
  await prisma.workflow.deleteMany()
  console.log('✓ Cleared\n')

  // ----- Seed each workflow -----
  for (const wf of workflows) {
    console.log(`📚 Seeding: ${wf.code} — ${wf.title}`)

    await prisma.workflow.create({
      data: {
        code: wf.code,
        title: wf.title,
        description: wf.description,
        department: wf.department,
        difficulty: wf.difficulty,
        estimatedMinutes: wf.estimatedMinutes,
        passMark: wf.passMark,
        renewalMonths: wf.renewalMonths,
        supervisorSignOffRequired: wf.supervisorSignOffRequired,
        learningObjectives: wf.learningObjectives,

        steps: {
          create: wf.steps.map((s, i) => ({
            title: s.title,
            objective: s.objective,
            content: s.content,
            videoUrl: s.videoUrl || null,
            order: i + 1,
            expectedMinutes: s.expectedMinutes ?? 5,
            warnings: s.warnings || [],
            completionChecks: s.completionChecks || [],
            requiresVideo: s.requiresVideo ?? false,
            requiresConfirmation: s.requiresConfirmation ?? true,
            requiresSupervisorSignOff: s.requiresSupervisorSignOff ?? false,
          })),
        },

        assessmentQuestions: {
          create: wf.assessmentQuestions.map((q, i) => ({
            order: i + 1,
            question: q.question,
            options: q.options,
            correctOption: q.correctOption,
            explanation: q.explanation,
          })),
        },
      },
    })

    console.log(`   ✓ ${wf.steps.length} steps, ${wf.assessmentQuestions.length} questions`)
  }

  const workflowCount = await prisma.workflow.count()
  const stepCount = await prisma.step.count()
  const questionCount = await prisma.assessmentQuestion.count()

  console.log(`\n🎉 Seed complete!`)
  console.log(`   Workflows: ${workflowCount}`)
  console.log(`   Steps:     ${stepCount}`)
  console.log(`   Questions: ${questionCount}`)
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })