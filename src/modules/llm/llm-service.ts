import { Issue } from "../issues/issue-types";
import { LLMAnalysisResponse, LLMIssuePlanResponse } from "./llm-types";
import { FakeLLMClient } from "./fake-llm-client";
import { Logger } from "../../utils/logger";

const TIMEOUT_MS = 10000; // 10 seconds

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

export class LLMService {
  private llmClient: FakeLLMClient = new FakeLLMClient();
  async analyzeIssue(
    logger: Logger,
    input: Issue
  ): Promise<LLMAnalysisResponse> {
    try {
      return await withTimeout(this.llmClient.analyzeIssue(input), TIMEOUT_MS);
    } catch (error) {
      logger.error("Failed to analyze issue", { error });
      throw error instanceof Error
        ? error
        : new Error("Failed to analyze issue");
    }
  }

  async planIssue(logger: Logger, input: Issue): Promise<LLMIssuePlanResponse> {
    try {
      return await withTimeout(this.llmClient.planIssue(input), TIMEOUT_MS);
    } catch (error) {
      logger.error("Failed to plan issue", { error });
      throw error instanceof Error ? error : new Error("Failed to plan issue");
    }
  }
}
