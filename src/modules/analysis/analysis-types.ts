import { DatabaseIssueId } from "../issues/issue-types";
import { LLMAnalysisResponse } from "../llm/llm-types";

export type DatabaseAnalysisId = string & { __flavor: "analysis" };

export interface DatabaseIssuesAnalysis {
  id: DatabaseAnalysisId;
  analysis: LLMAnalysisResponse;
  issueId: DatabaseIssueId;
  createdAt: Date;
}
