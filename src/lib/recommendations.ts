export function generateRecommendations(stepStats: any, anomalies: string[]) {
  const recommendations: string[] = [];

  const { dropOffRate, avgTime } = stepStats;

  if (anomalies.includes("High drop-off rate detected")) {
    recommendations.push(
      "Simplify step instructions or add clearer video guidance"
    );
    recommendations.push(
      "Break step into smaller sub-steps"
    );
  }

  if (anomalies.includes("Step execution time increasing abnormally")) {
    recommendations.push(
      "Reduce cognitive load (too many actions in one step)"
    );
    recommendations.push(
      "Add visual aids or checklist format"
    );
  }

  if (avgTime > 300000) {
    recommendations.push(
      "Consider reducing complexity or adding automation"
    );
  }

  return recommendations;
}
