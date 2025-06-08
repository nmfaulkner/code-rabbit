import { DatabaseIssueId } from "../issues/issue-types";
import { DatabaseIssuesAnalysis } from "./analysis-types";

const IN_MEMORY_ANALYSIS_DATABASE: DatabaseIssuesAnalysis[] = [];

export class AnalysisPersister {
  public async saveAnalysis(analysis: DatabaseIssuesAnalysis): Promise<DatabaseIssuesAnalysis> {
    IN_MEMORY_ANALYSIS_DATABASE.push(analysis);
    return analysis;
  }

  public async getAnalysisByIssueId(issueId: DatabaseIssueId): Promise<DatabaseIssuesAnalysis | null> {
    const found = IN_MEMORY_ANALYSIS_DATABASE.find((analysis) => analysis.issueId === issueId);
    return found || null;
  }
}
