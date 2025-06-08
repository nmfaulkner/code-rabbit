import { Issue } from "../issues/issue-types";
import { LLMAnalysisResponse, LLMIssuePlanResponse } from "./llm-types";
import { faker } from "@faker-js/faker";

export class FakeLLMClient {
  async analyzeIssue(_input: Issue): Promise<LLMAnalysisResponse> {
    return {
      labels: [faker.lorem.word()],
      assignedTo: faker.person.fullName(),
      confidence: faker.number.float({ min: 0, max: 1 }),
      priority: faker.helpers.arrayElement(["low", "medium", "high"]),
    };
  }

  async planIssue(_input: Issue): Promise<LLMIssuePlanResponse> {
    return {
      plan: faker.lorem.sentence(),
    };
  }
}
