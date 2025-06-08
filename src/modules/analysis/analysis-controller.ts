import { Controller, Path, Post, Route, Inject } from "tsoa";
import { IssuesService } from "../issues/issues-service";
import { DatabaseIssueId } from "../issues/issue-types";
import { AnalysisService } from "./analysis-service";
import { DatabaseIssuesAnalysis } from "./analysis-types";
import { Logger } from "../../utils/logger";
import { WithLogger } from "../../utils/decorator";

@Route("analyze")
export class AnalysisController extends Controller {
  private readonly issuesService: IssuesService = new IssuesService();
  private readonly analysisService: AnalysisService = new AnalysisService();

  @Post("{issueId}")
  @WithLogger()
  public async analyzeIssue(
    @Path() issueId: string,
    @Inject() logger: Logger
  ): Promise<DatabaseIssuesAnalysis> {
    logger.info(`Analyzing issue ${issueId}`);
    const issue = await this.issuesService.getIssueById(
      logger,
      issueId as DatabaseIssueId
    );
    if (!issue) {
      throw new Error("Issue not found");
    }

    return this.analysisService.analyzeIssue(logger, issue);
  }
}
