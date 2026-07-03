import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import http from "http";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";

import { loadConfig } from "@helpers/config.helper";
loadConfig();

import { logger } from "@helpers/logger.helper";
import { swaggerSpec } from "@helpers/swagger.helper";
import routes from "@routes";
import { type IUser } from "@dtos/user.dto";
import errorHandler from "@middlewares/error-handler.middleware";
import { globalLimiter } from "@middlewares/rate-limit.middleware";
import { initDB } from "@services/database.service";
import { initPassport } from "@services/passport-jwt.service";
import path from "path";
import { runPropertySeeder } from "@seeders/property.seeder";
import { ensureDefaultAdminUser } from "@seeders/user.seeder";

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

// Security middlewares
app.use(helmet({ 
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Disable CSP to allow Swagger UI resources to load
app.use(mongoSanitize());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(globalLimiter);

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

  // run property seeder/migration check
  await runPropertySeeder();

  // ensure a default admin user exists for login
  await ensureDefaultAdminUser();

  // passport init
  initPassport();

  // serve uploaded files statically
  app.use("/uploads", (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static(path.join(process.cwd(), "uploads")));

  // API Documentation (Swagger)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // set base path to /api
  app.use("/api", routes);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
};

void initApp();
