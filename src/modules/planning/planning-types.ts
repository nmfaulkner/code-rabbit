import { DatabaseIssueId } from "../issues/issue-types";

export type DatabasePlanId = string & { __flavor: "plan" };

export interface DatabaseIssuesPlan {
  id: DatabasePlanId;
  issueId: DatabaseIssueId;
  plan: string;
  createdAt: Date;
}
