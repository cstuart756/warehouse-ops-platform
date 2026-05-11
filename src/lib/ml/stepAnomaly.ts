import { zScore } from "./anomaly";

export function detectStepAnomaly(current: any, history: any[]) {
  const dropOffHistory = history.map((h) => h.dropOffRate);
  const timeHistory = history.map((h) => h.avgTime);

  const dropZ = zScore(current.dropOffRate, dropOffHistory);
  const timeZ = zScore(current.avgTime, timeHistory);

  const anomalies: string[] = [];

  if (Math.abs(dropZ) > 2) {
    anomalies.push("Statistical drop-off anomaly detected");
  }

  if (Math.abs(timeZ) > 2) {
    anomalies.push("Execution time anomaly detected");
  }

  return {
    anomalies,
    scores: {
      dropZ,
      timeZ,
    },
  };
}
