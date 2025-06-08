export interface LLMAnalysisResponse {
  labels: string[];
  assignedTo: string;
  confidence: number; // 0 to 1
  priority?: "low" | "medium" | "high";
}
export interface LLMIssuePlanResponse {
  plan: string;
}
