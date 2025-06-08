import { DatabaseIssuesAnalysis } from "../analysis/analysis-types";
import { DatabaseIssuesPlan } from "../planning/planning-types";

export interface CreateIssueRequest extends Omit<DatabaseIssue, "id"> {
  id: string;
}

export type DatabaseIssueId = string & { __flavor: "issue" };

export interface DatabaseIssue {
  id: DatabaseIssueId;
  title: string;
  description: string;
  author: string;
  createdAt: string;
}

export interface Issue extends DatabaseIssue {
  labels?: DatabaseIssuesAnalysis["analysis"]["labels"];
  assignedTo?: DatabaseIssuesAnalysis["analysis"]["assignedTo"];
  confidence?: DatabaseIssuesAnalysis["analysis"]["confidence"];
  priority?: DatabaseIssuesAnalysis["analysis"]["priority"];
  plan?: DatabaseIssuesPlan["plan"];
}
