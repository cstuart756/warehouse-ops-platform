export function detectAnomalies(stepStats: any) {
  const anomalies: string[] = [];

  const {
    dropOffRate,
    avgTime,
    baselineTime,
    escalationRate,
  } = stepStats;

  // 1. Drop-off spike
  if (dropOffRate > 40) {
    anomalies.push("High drop-off rate detected");
  }

  // 2. Time regression (step getting slower)
  if (baselineTime && avgTime > baselineTime * 1.5) {
    anomalies.push("Step execution time increasing abnormally");
  }

  // 3. Escalation spike
  if (escalationRate > 20) {
    anomalies.push("High escalation frequency");
  }

  return anomalies;
}
