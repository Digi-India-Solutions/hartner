import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import http from "http";
import morgan from "morgan";

import { loadConfig } from "@/common/helper/config.helper";
loadConfig();

import routes from "@/routes";
import { type IUser } from "@/user/user.dto";
import errorHandler from "@middlewares/error-handler.middleware";
import { globalLimiter } from "@middlewares/rate-limit.middleware";
import { initDB } from "@services/database.service";
import { initPassport } from "@services/passport-jwt.service";
import path from "path";
import { runPropertySeeder } from "@/property/property.seeder";
import { ensureDefaultAdminUser } from "@/user/user.seeder";

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
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // set base path to /api
  app.use("/api", routes);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // error handler
  app.use(errorHandler);
  http.createServer(app).listen(port, () => {
    console.log("Server is runnuing on port", port);
  });
};

void initApp();
