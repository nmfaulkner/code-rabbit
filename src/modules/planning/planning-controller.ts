import { Controller, Path, Post, Route, Inject } from "tsoa";
import { DatabaseIssuesPlan } from "./planning-types";
import { PlanningService } from "./planning-service";
import { IssuesService } from "../issues/issues-service";
import { DatabaseIssueId } from "../issues/issue-types";
import { Logger } from "../../utils/logger";
import { WithLogger } from "../../utils/decorator";

@Route("planning")
export class PlanningController extends Controller {
  private readonly planningService: PlanningService = new PlanningService();
  private readonly issuesService: IssuesService = new IssuesService();

  /**
   * Create a plan for an issue
   */
  @Post("{issueId}")
  @WithLogger()
  public async createPlan(
    @Path() issueId: string,
    @Inject() logger: Logger
  ): Promise<DatabaseIssuesPlan> {
    logger.info(`Creating plan for issue ${issueId}`);
    const issue = await this.issuesService.getIssueById(
      logger,
      issueId as DatabaseIssueId
    );
    if (!issue) {
      logger.error(`Issue not found for id ${issueId}`);
      throw new Error("Issue not found");
    }

    return this.planningService.createPlan(logger, issue);
  }
}
