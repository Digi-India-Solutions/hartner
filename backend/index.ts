import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { loadConfig } from "@helpers/config.helper";
loadConfig();

import { type IUser } from "@dtos/user.dto";
import { logger } from "@helpers/logger.helper";
import { swaggerSpec } from "@helpers/swagger.helper";
import errorHandler from "@middlewares/error-handler.middleware";
import { globalLimiter } from "@middlewares/rate-limit.middleware";
import routes from "@routes";
import { runPropertySeeder } from "@seeders/property.seeder";
import { ensureDefaultAdminUser } from "@seeders/user.seeder";
import { initDB } from "@services/database.service";
import { initPassport } from "@services/passport-jwt.service";
import path from "path";

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

// Trust proxy for rate limiting behind reverse proxies (like Nginx, Cloudflare, etc.)
app.set("trust proxy", true);

// Security middlewares
app.use(helmet({ 
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Disable CSP to allow Swagger UI resources to load
app.use(mongoSanitize());

// ✅ UPDATED CORS CONFIGURATION
const allowedOrigins = [
  // Development
  'http://localhost:3000',
  'http://localhost:3001',
  // Production
  'https://hart.digiindiasolutions.com',
  'https://hartapi.digiindiasolutions.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('❌ CORS blocked for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }),
);
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
