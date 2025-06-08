import { PlanningController } from "../../../src/modules/planning/planning-controller";
import { IssuesService } from "../../../src/modules/issues/issues-service";
import {
  CreateIssueRequest,
  DatabaseIssueId,
} from "../../../src/modules/issues/issue-types";
import { faker } from "@faker-js/faker";
import { Logger } from "../../../src/utils/logger";

describe("PlanningController", () => {
  let controller: PlanningController;
  let issuesService: IssuesService;
  let logger: Logger;

  beforeEach(() => {
    issuesService = new IssuesService();
    controller = new PlanningController();
  });

  describe("createPlan", () => {
    it("should create a plan for an existing issue", async () => {
      // Create an issue first
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(createRequest, new Logger());

      // Create plan should return a plan
      const plan = await controller.createPlan(createdIssue.id);

      // Verify plan structure
      expect(plan).toBeDefined();
      expect(plan.id).toBeDefined();
      expect(plan.issueId).toBe(createdIssue.id);
      expect(plan.plan).toBeDefined();
      expect(plan.createdAt).toBeDefined();
      expect(plan.createdAt instanceof Date).toBe(true);
    });

    it("should throw when issue doesn't exist", async () => {
      const nonExistentId = faker.string.uuid() as DatabaseIssueId;

      await expect(controller.createPlan(nonExistentId)).rejects.toThrow(
        "Issue not found"
      );
    });
  });
});
