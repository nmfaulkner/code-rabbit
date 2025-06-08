import { Controller, Post, Route, Body, Inject } from "tsoa";
import { CreateIssueRequest } from "../issues/issue-types";
import { IssuesService } from "../issues/issues-service";
import { Logger } from "../../utils/logger";
import { WithLogger } from "../../utils/decorator";

@Route("events")
export class EventsController extends Controller {
  private readonly issuesService: IssuesService = new IssuesService();

  @Post()
  @WithLogger()
  public async createEvent(
    @Body() requestBody: CreateIssueRequest,
    @Inject() logger: Logger
  ): Promise<void> {
    logger.info("Creating new issue from event", { requestBody });
    await this.issuesService.createIssue(requestBody, logger);
  }
}
