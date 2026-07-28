function getTaskProgressMetrics({ currentStep, totalSteps, completedSteps }) {
  const safeCurrentStep = Math.max(0, Number(currentStep) || 0)
  const safeTotalSteps = Math.max(0, Number(totalSteps) || 0)
  const safeCompletedSteps = Math.max(0, Number(completedSteps) || 0)

  const percentComplete = safeTotalSteps === 0
    ? 0
    : Math.round((safeCompletedSteps / safeTotalSteps) * 100)

  const currentStepNumber = safeTotalSteps === 0
    ? 0
    : Math.min(safeCurrentStep + 1, safeTotalSteps)

  const isComplete = safeTotalSteps > 0 && safeCompletedSteps >= safeTotalSteps
  const stepsRemaining = safeTotalSteps === 0 ? 0 : Math.max(safeTotalSteps - safeCompletedSteps, 0)
  const statusLabel = isComplete
    ? 'Task complete'
    : stepsRemaining === 0
      ? 'Ready to continue'
      : `${stepsRemaining} step${stepsRemaining === 1 ? '' : 's'} remaining`

  const nextLabel = isComplete ? 'Finished' : safeCurrentStep >= safeTotalSteps - 1 ? 'Complete Task' : 'Next step'

  return {
    percentComplete,
    currentStepNumber,
    isComplete,
    nextLabel,
    stepsRemaining,
    statusLabel,
  }
}

function getTaskHistorySummary(task) {
  const completedEntries = (task?.progress ?? [])
    .filter((entry) => entry?.completed)
    .map((entry) => ({
      id: entry.id,
      label: entry.step?.title || entry.stepTitle || 'Completed step',
      completedAt: entry.completedAt,
    }))
    .sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))

  return {
    completedCount: completedEntries.length,
    auditTrail: completedEntries,
    latestEntry: completedEntries[0] || null,
  }
}

module.exports = {
  getTaskProgressMetrics,
  getTaskHistorySummary,
}
