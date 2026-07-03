import dotenv from "dotenv";
import process from "process";
import path from "path";
import fs from "fs";

export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";
  let filepath = path.join(process.cwd(), `.env.${env}`);
  
  if (!fs.existsSync(filepath)) {
    // fallback to .env.local if the env-specific file does not exist
    filepath = path.join(process.cwd(), ".env.local");
  }
  
  dotenv.config({ path: filepath });
};
