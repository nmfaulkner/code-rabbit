import { IssuesService } from "../../../src/modules/issues/issues-service";
import {
  CreateIssueRequest,
  DatabaseIssueId,
} from "../../../src/modules/issues/issue-types";
import { faker } from "@faker-js/faker";
import { AnalysisController } from "../../../src/modules/analysis/analysis-controller";
import { PlanningController } from "../../../src/modules/planning/planning-controller";
import { Logger } from "../../../src/utils/logger";

describe("IssuesService", () => {
  let issuesService: IssuesService;

  beforeEach(() => {
    issuesService = new IssuesService();
  });

  describe("createIssue", () => {
    it("should create an issue with the correct structure", async () => {
      const createIssueRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(
        createIssueRequest,
        new Logger()
      );

      expect(createdIssue).toBeDefined();
      expect(createdIssue.id).toBe(createIssueRequest.id as DatabaseIssueId);
      expect(createdIssue.title).toBe(createIssueRequest.title);
      expect(createdIssue.description).toBe(createIssueRequest.description);
      expect(createdIssue.author).toBe(createIssueRequest.author);
      expect(createdIssue.createdAt).toBe(createIssueRequest.createdAt);
    });
  });
  describe("getIssueById", () => {
    it("should get issue with correct creation data", async () => {
      // Create an issue first
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      await issuesService.createIssue(createRequest, new Logger());

      // Get the issue
      const retrievedIssue = await issuesService.getIssueById(
        new Logger(),
        createRequest.id as DatabaseIssueId
      );

      // Verify all fields match
      expect(retrievedIssue).toBeDefined();
      expect(retrievedIssue!.id).toBe(createRequest.id as DatabaseIssueId);
      expect(retrievedIssue!.title).toBe(createRequest.title);
      expect(retrievedIssue!.description).toBe(createRequest.description);
      expect(retrievedIssue!.author).toBe(createRequest.author);
      expect(retrievedIssue!.createdAt).toBe(createRequest.createdAt);
    });

    it("should include analysis data after analysis is called", async () => {
      // Create an issue
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(
        createRequest,
        new Logger()
      );

      // Create analysis
      const analysisController = new AnalysisController();
      await analysisController.analyzeIssue(createdIssue.id);

      // Get the issue with analysis
      const retrievedIssue = await issuesService.getIssueById(
        new Logger(),
        createdIssue.id
      );

      // Verify analysis data is present
      expect(retrievedIssue).toBeDefined();
      expect(retrievedIssue!.labels).toBeDefined();
      expect(retrievedIssue!.assignedTo).toBeDefined();
      expect(retrievedIssue!.confidence).toBeDefined();
      expect(retrievedIssue!.priority).toBeDefined();
      expect(retrievedIssue!.plan).toBeUndefined(); // Plan not created yet
    });

    it("should include both analysis and plan data after each is called", async () => {
      // Create an issue
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(
        createRequest,
        new Logger()
      );

      // Run analysis
      const analysisController = new AnalysisController();
      await analysisController.analyzeIssue(createdIssue.id);

      // Create plan
      const planningController = new PlanningController();
      await planningController.createPlan(createdIssue.id);

      // Get the issue with both analysis and plan
      const retrievedIssue = await issuesService.getIssueById(
        new Logger(),
        createdIssue.id
      );

      // Verify both analysis and plan data are present
      expect(retrievedIssue).toBeDefined();
      expect(retrievedIssue!.labels).toBeDefined();
      expect(retrievedIssue!.assignedTo).toBeDefined();
      expect(retrievedIssue!.confidence).toBeDefined();
      expect(retrievedIssue!.priority).toBeDefined();
      expect(retrievedIssue!.plan).toBeDefined();
    });
  });
});
