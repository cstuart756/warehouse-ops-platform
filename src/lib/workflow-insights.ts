type WorkflowInsight = {
  workflowId: string
  workflowTitle: string
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  averageCompletion: number
  mostCommonIssue: string | null
}

export function summariseWorkflowInsights(tasks: Array<any>, workflows: Array<any>): WorkflowInsight[] {
  return workflows.map((workflow) => {
    const workflowTasks = tasks.filter((task) => task.workflowId === workflow.id)
    const completedTasks = workflowTasks.filter((task) => task.status === 'COMPLETED').length
    const inProgressTasks = workflowTasks.filter((task) => task.status === 'IN_PROGRESS').length
    const totalTasks = workflowTasks.length
    const averageCompletion = totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

    const issues = workflowTasks
      .map((task) => task.status)
      .filter((status) => status === 'PENDING' || status === 'IN_PROGRESS')

    const mostCommonIssue = issues.length === 0
      ? null
      : issues.reduce((acc: Record<string, number>, status: string) => {
          acc[status] = (acc[status] ?? 0) + 1
          return acc
        }, {})

    const issueEntries = Object.entries(mostCommonIssue ?? {}) as Array<[string, number]>
    const dominantIssue = issueEntries.length === 0
      ? null
      : issueEntries.sort((a, b) => b[1] - a[1])[0][0]

    return {
      workflowId: workflow.id,
      workflowTitle: workflow.title,
      totalTasks,
      completedTasks,
      inProgressTasks,
      averageCompletion,
      mostCommonIssue: dominantIssue ? `${dominantIssue.toLowerCase()} tasks` : null,
    }
  })
}
