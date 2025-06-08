import { DatabaseIssueId, Issue } from "../issues/issue-types";
import { LLMService } from "../llm/llm-service";
import { AnalysisPersister } from "./analysis-persister";
import { DatabaseIssuesAnalysis, DatabaseAnalysisId } from "./analysis-types";
import { Logger } from "../../utils/logger";

export class AnalysisService {
  private readonly llmService: LLMService = new LLMService();
  private readonly analysisPersister: AnalysisPersister =
    new AnalysisPersister();

  public async analyzeIssue(
    logger: Logger,
    issue: Issue
  ): Promise<DatabaseIssuesAnalysis> {
    const analysis = await this.llmService.analyzeIssue(logger, issue);
    logger.info(`Analysis completed for issue ${issue.id}`, { analysis });
    return this.analysisPersister.saveAnalysis({
      id: `${issue.id}-analysis-${Date.now()}` as DatabaseAnalysisId,
      analysis,
      issueId: issue.id,
      createdAt: new Date(),
    });
  }

  public async getAnalysisByIssueId(
    logger: Logger,
    issueId: DatabaseIssueId
  ): Promise<DatabaseIssuesAnalysis | null> {
    return this.analysisPersister.getAnalysisByIssueId(issueId);
  }
}
