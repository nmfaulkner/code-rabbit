import { Issue, DatabaseIssueId, CreateIssueRequest } from "./issue-types";
import { IssuesPersister } from "./issues-persister";
import { AnalysisService } from "../analysis/analysis-service";
import { PlanningService } from "../planning/planning-service";
import { Logger } from "../../utils/logger";

export class IssuesService {
  private readonly issuesPersister: IssuesPersister = new IssuesPersister();
  private readonly analysisService: AnalysisService = new AnalysisService();
  private readonly planningService: PlanningService = new PlanningService();

  public async createIssue(
    issue: CreateIssueRequest,
    logger: Logger
  ): Promise<Issue> {
    return this.issuesPersister.createIssue(issue);
  }

  public async getIssues(logger: Logger): Promise<Issue[]> {
    const databaseIssues = await this.issuesPersister.getIssues();
    return Promise.all(
      databaseIssues.map(async (issue) => this.getIssueById(logger, issue.id))
    );
  }

  public async getIssueById(
    logger: Logger,
    id: DatabaseIssueId
  ): Promise<Issue> {
    const databaseIssue = await this.issuesPersister.getIssueById(id);
    if (!databaseIssue) {
      throw new Error("Issue not found");
    }
    const analysis = await this.analysisService.getAnalysisByIssueId(
      logger,
      id
    );
    const plan = await this.planningService.getPlanByIssueId(logger, id);
    return {
      ...databaseIssue,
      labels: analysis?.analysis.labels,
      confidence: analysis?.analysis.confidence,
      priority: analysis?.analysis.priority,
      assignedTo: analysis?.analysis.assignedTo,
      plan: plan?.plan,
    };
  }
}
