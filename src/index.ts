import express, { json, urlencoded, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Swagger documentation
app.use("/docs", swaggerUi.serve);
app.get("/docs", async (req: Request, res: Response) => {
  try {
    const swaggerDoc = await import("../public/swagger.json");
    res.send(swaggerUi.generateHTML(swaggerDoc));
  } catch (error) {
    console.error("Failed to load swagger documentation:", error);
    res.status(500).send("Failed to load API documentation");
  }
});

// Register tsoa routes
RegisterRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/docs`
  );
});
