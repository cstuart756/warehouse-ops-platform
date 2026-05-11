export function optimiseWorkflow(step: any, riskScore: number) {
  const suggestions: string[] = [];

  if (riskScore > 70) {
    suggestions.push("Split step into smaller sub-steps");
    suggestions.push("Add mandatory video training");
    suggestions.push("Introduce checklist validation");
  }

  if (riskScore > 40) {
    suggestions.push("Improve visual clarity of instructions");
    suggestions.push("Reduce cognitive load");
  }

  if (riskScore < 20) {
    suggestions.push("Step is efficient — consider reuse in other workflows");
  }

  return suggestions;
}
