import { IssuesController } from "../../../src/modules/issues/issues-controller";
import {
  CreateIssueRequest,
  DatabaseIssueId,
  Issue,
} from "../../../src/modules/issues/issue-types";
import { faker } from "@faker-js/faker";
import { IssuesService } from "../../../src/modules/issues/issues-service";
import { Logger } from "../../../src/utils/logger";

describe("IssuesController", () => {
  let controller: IssuesController;
  let issuesService: IssuesService;

  beforeEach(() => {
    issuesService = new IssuesService();
    controller = new IssuesController();
  });

  describe("getIssues", () => {
    it("should return all created issues", async () => {
      // Create a few issues first
      const createRequests: CreateIssueRequest[] = Array.from(
        { length: 3 },
        () => ({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          author: faker.person.fullName(),
          createdAt: new Date().toISOString(),
        })
      );

      // Create issues using the service
      const createdIssues = await Promise.all(
        createRequests.map((req) => issuesService.createIssue(req, new Logger()))
      );

      // Get all issues through the controller
      const result = await controller.getIssues();

      // Verify we got all our issues back
      expect(result).toHaveLength(createdIssues.length);
      createdIssues.forEach((issue) => {
        const found = result.find((r) => r.id === issue.id);
        expect(found).toBeDefined();
        expect(found).toMatchObject({
          title: issue.title,
          description: issue.description,
          author: issue.author,
        });
      });
    });
  });

  describe("getIssue", () => {
    it("should return a specific issue when it exists", async () => {
      // Create an issue first
      const createRequest: CreateIssueRequest = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.person.fullName(),
        createdAt: new Date().toISOString(),
      };

      const createdIssue = await issuesService.createIssue(createRequest, new Logger());

      // Get the issue through the controller
      const result = await controller.getIssue(createdIssue.id);

      // Verify we got the right issue back
      expect(result).toBeDefined();
      expect(result).toMatchObject({
        id: createdIssue.id,
        title: createdIssue.title,
        description: createdIssue.description,
        author: createdIssue.author,
        createdAt: createdIssue.createdAt,
      });
    });

    it("should throw an error when issue doesn't exist", async () => {
      const nonExistentId = faker.string.uuid() as DatabaseIssueId;

      // Try to get a non-existent issue
      await expect(controller.getIssue(nonExistentId)).rejects.toThrow(
        "Issue not found"
      );
    });
  });
});
