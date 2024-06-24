import dotenv from "dotenv";
import { string, z } from "zod";

dotenv.config();

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: string(),
  AWS_SECRET_ACCESS_KEY: string(),
  AWS_REGION: string(),
  MONGO_URL: string(),
  JWT_SECRET: string(),
});

const env = envSchema.parse(process.env);

export { env };
