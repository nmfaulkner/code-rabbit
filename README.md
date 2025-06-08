# Code Rabbit Take Home

## Getting Started

```bash
# Install project dependencies
make setup

# Build the TypeScript project
make build

# Start the development server with hot-reload
make watch

# Run the test suite
make test
```

Swagger documentation available at http://localhost:{port}/swagger.

## High Level Architecture

Modules (src/modules):

Application logic is split into modules. Each module represents a logical entity, and often has an accompanying controller, service, and persister. A controller represents the top level REST API, and handles incoming request logic, such as validation and authentication. A service handles the business logic, and a persister handles the persistence of data. Some people prefer to have their file structure be /controllers, /services, /persistence, etc. I find it helpful to have all logic and types in the same place for easy lookup.

There were a few design decisions I went back on forth here:

1. Should "events" be its own module
2. Should each of the analysis/planning modules be within a parent "issues" module.
   I ended up with the current structure because it most closely resembled the API path structure in the prompt.

### Controllers

I decided to use a library called tsoa to generate the routes and controller decorators. I have not used this in a production setting, but have experimented with it on my own on the side. I like it for how easy it is to generate endpoints with out-of-the-box decorators, as well as build custom decorators (like I did with logger, more below). Additionally, it automatically creates a Swagger doc, which I find really helpful as living documentation.

### Data Storage and Typing

I mocked data storage in memory in each persister for ease of development. I tried to copy the structure I would use in a databse-- treat issues, analysis, and planning as separate tables with foreign keys. My typing should reflect that, with DatabaseIssue, DatabaseIssueAnalysis, and DatabaseIssuePlan, each of which are in their corresponding module. I like specifying the type of the database ID as string & {\_\_flavor: '{type}'} to better type checking when passing arguments.

I created a joined type Issue that adds analysis and plan to the DatabaseIssue type. I found this useful for passing to the LLM and for returning the full object in the API.

### Logging:

I add a logger in src/utils/logger.ts. This is instantiated on each incoming request using a tsoa Decorator with a request ID to allow for traceability. As part of this, it will log each incoming request. For now, this is just a simple console log, but in a production setting could easily be replaced with Datadog or other observability tools.

### LLM Service

I created a fake-llm-client.ts that implements the LLMService interface. I just used faker here to generate fake data for development and testing. My LLMService calls this client with try/catch logic to handle errors.

### Testing

I added Unit tests for most controllers and services. In a production setting, I would add more coverage and likely also build out integration tests for the database using Docker.

## Productionizing

There's a few things I would address to make this a productionized, scalable application:

### Database

Postgres is my go-to database for most applications, unless there's special requirements. This case seems like a good fit for Postgres for a few reasons:

- there's a natural relationship between the tables (issues, analysis, and planning), meaning a relational database is a good fit
- I would expect the number of issues to be manageable (less than ~500 million) for a while as this product scales. Additionally, I would expect there to be roughly 1:1 ratio of issues to analysis and planning. Maybe we do multiple analysis/plans over time for some issues, but in general I don't expect it be a order of magnitude higher. This means similarily the analysis and planning tables will be manageable.
- Postgres is pretty well understood by the developer community, which would allow for faster developing and better dev experience.

We don't use ORM's at my current company (we use Objection with Knex). Those are both good options, but I also like Prisma or TypeORM. Whichever you use, I prefer doing SQL migrations directly (instead of through code), and to have the database calls limited to the persister of the corresponding table. I think this provides nice structure which makes it easier to debug and is less error prone.

My table stucture would look something like:

```sql
CREATE TABLE issues (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE issue_analysis (
    id VARCHAR(255) PRIMARY KEY,
    issue_id VARCHAR(255) NOT NULL REFERENCES issues(id),
    analysis JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE issue_plan (
    id VARCHAR(255) PRIMARY KEY,
    issue_id VARCHAR(255) NOT NULL REFERENCES issues(id),
    plan JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
```

### Authentication

I did not build out authentication as part of this.I would use a third party library for Authentication, such as Auth0, Stytch, or Okta. We had trouble at my current company with credential stuffing attacks, and I think in general Auth is a hard problem that detracts from core product development, so I would default with using a third party service until the cost became an issue.

### Logging

I like using Datadog for logging and observability. It's powerful and generally pretty easy to use (both setup and ongoing usage). I would add this to my current logger.

### Job Orchestration

For background tasks / cron jobs, there's a few options I would consider:

- PGBoss. We used PGBoss at my current company, and it's a good option for simple one time jobs and cron jobs.
- RabbitMQ. I've not used RabbitMQ myself, but I know its a very popular tool for task queues.
- Temporal. Temporal is a workflow orchestration tool that we've started using at TruckSmarter. It allows for durable and long running execution of workflows. Its pretty heavy weight compared to the other two, but allows for more complex workflows/business logic.

Each of these could be used to analyze and plan issues in the background instead of requiring human action.
