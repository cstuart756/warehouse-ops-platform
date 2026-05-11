export function predictFailure(features: any) {
  const { volume, dropOffRate, avgTime } = features;

  let risk = 0;

  // High drop-off = structural failure risk
  risk += dropOffRate * 0.6;

  // Time inefficiency = cognitive overload risk
  if (avgTime > 300000) risk += 20;

  // Low volume + high drop-off = unstable process
  if (volume < 10 && dropOffRate > 30) risk += 15;

  // Normalize
  return Math.min(100, Math.round(risk));
}
