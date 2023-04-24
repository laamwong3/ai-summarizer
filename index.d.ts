import { z } from "zod";

const envSchema = z.object({
  RAPID_API_KEY: z.string(),
  RAPID_API_HOST: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
