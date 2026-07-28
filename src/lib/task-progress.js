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
  const nextLabel = isComplete ? 'Finished' : safeCurrentStep >= safeTotalSteps - 1 ? 'Complete Task' : 'Next step'

  return {
    percentComplete,
    currentStepNumber,
    isComplete,
    nextLabel,
  }
}

module.exports = {
  getTaskProgressMetrics,
}
