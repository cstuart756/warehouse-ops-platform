const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const workflow = await prisma.workflow.create({
    data: {
      title: 'Receive Stock',
      description: 'Standard process for receiving supplier deliveries',
      steps: {
        create: [
          { title: 'Check delivery manifest', content: 'Verify items and quantities on manifest', order: 1 },
          { title: 'Inspect goods for damage', content: 'Visually inspect goods and report damage', order: 2 },
          { title: 'Log into system and create intake record', content: 'Enter SKU and quantities', order: 3 }
        ]
      }
    },
    include: { steps: true }
  })

  console.log('Seeded workflow:', workflow.title)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
