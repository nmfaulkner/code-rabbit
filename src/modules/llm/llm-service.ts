import { Issue } from "../issues/issue-types";
import { LLMAnalysisResponse, LLMIssuePlanResponse } from "./llm-types";
import { FakeLLMClient } from "./fake-llm-client";
import { Logger } from "../../utils/logger";

export class LLMService {
  private llmClient: FakeLLMClient = new FakeLLMClient();
  async analyzeIssue(
    logger: Logger,
    input: Issue
  ): Promise<LLMAnalysisResponse> {
    try {
      return this.llmClient.analyzeIssue(input);
    } catch (error) {
      logger.error("Failed to analyze issue", { error });
      throw new Error("Failed to analyze issue");
    }
  }

  async planIssue(logger: Logger, input: Issue): Promise<LLMIssuePlanResponse> {
    try {
      return this.llmClient.planIssue(input);
    } catch (error) {
      logger.error("Failed to plan issue", { error });
      throw new Error("Failed to plan issue");
    }
  }
}
