import { CreateIssueRequest, DatabaseIssueId, Issue } from "./issue-types";

const IN_MEMORY_ISSUES: Issue[] = [];

export class IssuesPersister {
  public async createIssue(issue: CreateIssueRequest): Promise<Issue> {
    const convertedIssue: Issue = {
      ...issue,
      id: issue.id as DatabaseIssueId,
    };
    IN_MEMORY_ISSUES.push(convertedIssue);
    return convertedIssue;
  }

  public async getIssues(): Promise<Issue[]> {
    return IN_MEMORY_ISSUES;
  }

  public async getIssueById(id: string): Promise<Issue | null> {
    return IN_MEMORY_ISSUES.find((i) => i.id === id) || null;
  }
}
