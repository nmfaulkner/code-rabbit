import { Controller, Get, Path, Route, Inject } from "tsoa";
import { Issue, DatabaseIssueId } from "./issue-types";
import { IssuesService } from "../issues/issues-service";
import { Logger } from "../../utils/logger";
import { WithLogger } from "../../utils/decorator";

@Route("issues")
export class IssuesController extends Controller {
  private readonly issuesService: IssuesService = new IssuesService();

  /**
   * Get all issues
   */
  @Get()
  @WithLogger()
  public async getIssues(@Inject() logger: Logger): Promise<Issue[]> {
    logger.info("Getting all issues");
    return this.issuesService.getIssues(logger);
  }

  /**
   * Get an issue by id
   */
  @Get("{issueId}")
  @WithLogger()
  public async getIssue(
    @Path() issueId: string,
    @Inject() logger: Logger
  ): Promise<Issue> {
    logger.info(`Getting issue ${issueId}`);
    const issue = await this.issuesService.getIssueById(
      logger,
      issueId as DatabaseIssueId
    );
    if (!issue) {
      throw new Error("Issue not found");
    }
    return issue;
  }
}
