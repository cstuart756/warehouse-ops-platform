export function buildFeatures(step: any) {
  const completed = step.progress.filter((p: any) => p.completed);

  const dropOffRate =
    step.progress.length === 0
      ? 0
      : ((step.progress.length - completed.length) /
          step.progress.length) *
        100;

  const avgTime =
    completed.reduce((acc: number, p: any) => {
      return (
        acc +
        (new Date(p.completedAt!).getTime() -
          new Date(p.startedAt).getTime())
      );
    }, 0) / (completed.length || 1);

  return {
    volume: step.progress.length,
    dropOffRate,
    avgTime,
  };
}
