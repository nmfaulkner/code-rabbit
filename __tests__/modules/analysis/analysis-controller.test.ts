import { AnalysisController } from "../../../src/modules/analysis/analysis-controller";
import { IssuesService } from "../../../src/modules/issues/issues-service";
import {
  CreateIssueRequest,
  DatabaseIssueId,
} from "../../../src/modules/issues/issue-types";
import { faker } from "@faker-js/faker";
import { Logger } from "../../../src/utils/logger";

describe("AnalysisController", () => {
  let controller: AnalysisController;
  let issuesService: IssuesService;
  let logger: Logger;

  beforeEach(() => {
    issuesService = new IssuesService();
    controller = new AnalysisController();
  });

  describe("analyzeIssue", () => {
    it("should analyze an existing issue", async () => {
      // Create an issue first
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(createRequest, new Logger());

      // Analyze should not throw
      await expect(
        controller.analyzeIssue(createdIssue.id)
      ).resolves.not.toThrow();
    });

    it("should throw when issue doesn't exist", async () => {
      const nonExistentId = faker.string.uuid() as DatabaseIssueId;

      await expect(controller.analyzeIssue(nonExistentId)).rejects.toThrow(
        "Issue not found"
      );
    });
  });
});
