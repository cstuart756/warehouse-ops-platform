const test = require('node:test')
const assert = require('node:assert/strict')
const { getTaskProgressMetrics } = require('./task-progress.js')

test('calculates percentage for an in-progress task', () => {
  const metrics = getTaskProgressMetrics({ currentStep: 1, totalSteps: 3, completedSteps: 1 })

  assert.equal(metrics.percentComplete, 33)
  assert.equal(metrics.currentStepNumber, 2)
  assert.equal(metrics.isComplete, false)
})

test('marks a task complete when all steps are done', () => {
  const metrics = getTaskProgressMetrics({ currentStep: 3, totalSteps: 3, completedSteps: 3 })

  assert.equal(metrics.percentComplete, 100)
  assert.equal(metrics.isComplete, true)
  assert.equal(metrics.nextLabel, 'Finished')
})
