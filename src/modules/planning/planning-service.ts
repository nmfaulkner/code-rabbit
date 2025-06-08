import { DatabaseIssueId, Issue } from "../issues/issue-types";
import { LLMService } from "../llm/llm-service";
import { DatabaseIssuesPlan, DatabasePlanId } from "./planning-types";
import { PlanningPersister } from "./planning-persister";
import { Logger } from "../../utils/logger";

export class PlanningService {
  private readonly llmService: LLMService = new LLMService();
  private readonly planningPersister: PlanningPersister =
    new PlanningPersister();

  public async createPlan(
    logger: Logger,
    issue: Issue
  ): Promise<DatabaseIssuesPlan> {
    const llmPlan = await this.llmService.planIssue(logger, issue);
    logger.info(`Plan completed for issue ${issue.id}`, { plan: llmPlan.plan });
    return this.planningPersister.savePlan({
      id: `${issue.id}-plan-${Date.now()}` as DatabasePlanId,
      issueId: issue.id,
      plan: llmPlan.plan,
      createdAt: new Date(),
    });
  }

  public async getPlanByIssueId(
    logger: Logger,
    issueId: DatabaseIssueId
  ): Promise<DatabaseIssuesPlan | undefined> {
    return this.planningPersister.getPlanByIssueId(issueId);
  }
}
