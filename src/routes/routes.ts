/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PlanningController } from './../modules/planning/planning-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IssuesController } from './../modules/issues/issues-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventsController } from './../modules/events/events-controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnalysisController } from './../modules/analysis/analysis-controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "DatabasePlanId": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"__flavor":{"dataType":"enum","enums":["plan"],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DatabaseIssueId": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"__flavor":{"dataType":"enum","enums":["issue"],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DatabaseIssuesPlan": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"DatabasePlanId","required":true},
            "issueId": {"ref":"DatabaseIssueId","required":true},
            "plan": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Issue": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"DatabaseIssueId","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "author": {"dataType":"string","required":true},
            "createdAt": {"dataType":"string","required":true},
            "labels": {"dataType":"array","array":{"dataType":"string"}},
            "assignedTo": {"dataType":"string"},
            "confidence": {"dataType":"double"},
            "priority": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["low"]},{"dataType":"enum","enums":["medium"]},{"dataType":"enum","enums":["high"]}]},
            "plan": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_DatabaseIssue.Exclude_keyofDatabaseIssue.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"author":{"dataType":"string","required":true},"createdAt":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateIssueRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "author": {"dataType":"string","required":true},
            "createdAt": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DatabaseAnalysisId": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"__flavor":{"dataType":"enum","enums":["analysis"],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LLMAnalysisResponse": {
        "dataType": "refObject",
        "properties": {
            "labels": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "assignedTo": {"dataType":"string","required":true},
            "confidence": {"dataType":"double","required":true},
            "priority": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["low"]},{"dataType":"enum","enums":["medium"]},{"dataType":"enum","enums":["high"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DatabaseIssuesAnalysis": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"DatabaseAnalysisId","required":true},
            "analysis": {"ref":"LLMAnalysisResponse","required":true},
            "issueId": {"ref":"DatabaseIssueId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPlanningController_createPlan: Record<string, TsoaRoute.ParameterSchema> = {
                issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
        };
        app.post('/planning/:issueId',
            ...(fetchMiddlewares<RequestHandler>(PlanningController)),
            ...(fetchMiddlewares<RequestHandler>(PlanningController.prototype.createPlan)),

            async function PlanningController_createPlan(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPlanningController_createPlan, request, response });

                const controller = new PlanningController();

              await templateService.apiHandler({
                methodName: 'createPlan',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIssuesController_getIssues: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/issues',
            ...(fetchMiddlewares<RequestHandler>(IssuesController)),
            ...(fetchMiddlewares<RequestHandler>(IssuesController.prototype.getIssues)),

            async function IssuesController_getIssues(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIssuesController_getIssues, request, response });

                const controller = new IssuesController();

              await templateService.apiHandler({
                methodName: 'getIssues',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsIssuesController_getIssue: Record<string, TsoaRoute.ParameterSchema> = {
                issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
        };
        app.get('/issues/:issueId',
            ...(fetchMiddlewares<RequestHandler>(IssuesController)),
            ...(fetchMiddlewares<RequestHandler>(IssuesController.prototype.getIssue)),

            async function IssuesController_getIssue(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsIssuesController_getIssue, request, response });

                const controller = new IssuesController();

              await templateService.apiHandler({
                methodName: 'getIssue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventsController_createEvent: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateIssueRequest"},
        };
        app.post('/events',
            ...(fetchMiddlewares<RequestHandler>(EventsController)),
            ...(fetchMiddlewares<RequestHandler>(EventsController.prototype.createEvent)),

            async function EventsController_createEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventsController_createEvent, request, response });

                const controller = new EventsController();

              await templateService.apiHandler({
                methodName: 'createEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAnalysisController_analyzeIssue: Record<string, TsoaRoute.ParameterSchema> = {
                issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
        };
        app.post('/analyze/:issueId',
            ...(fetchMiddlewares<RequestHandler>(AnalysisController)),
            ...(fetchMiddlewares<RequestHandler>(AnalysisController.prototype.analyzeIssue)),

            async function AnalysisController_analyzeIssue(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAnalysisController_analyzeIssue, request, response });

                const controller = new AnalysisController();

              await templateService.apiHandler({
                methodName: 'analyzeIssue',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
