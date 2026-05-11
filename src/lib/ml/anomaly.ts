export function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
}

export function stddev(arr: number[]) {
  const m = mean(arr);
  return Math.sqrt(
    mean(arr.map((x) => Math.pow(x - m, 2)))
  );
}

export function zScore(value: number, arr: number[]) {
  const m = mean(arr);
  const s = stddev(arr);

  if (s === 0) return 0;

  return (value - m) / s;
}
