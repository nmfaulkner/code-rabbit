import { DatabaseIssueId } from "../issues/issue-types";
import { DatabaseIssuesPlan } from "./planning-types";

const IN_MEMORY_PLANNING_DATABASE: DatabaseIssuesPlan[] = [];

export class PlanningPersister {
  public async savePlan(plan: DatabaseIssuesPlan): Promise<DatabaseIssuesPlan> {
    IN_MEMORY_PLANNING_DATABASE.push(plan);
    return plan;
  }

  public async getPlanByIssueId(
    issueId: DatabaseIssueId
  ): Promise<DatabaseIssuesPlan | undefined> {
    return IN_MEMORY_PLANNING_DATABASE.find((plan) => plan.issueId === issueId);
  }
}
