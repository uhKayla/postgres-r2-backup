import { z } from "zod";

const envSchema = z.object({
  R2_BUCKET: z.string().trim().min(1),
  R2_ENDPOINT_URL: z.string().trim().min(1),
  R2_ACCESS_KEY_ID: z.string().trim().min(1),
  R2_SECRET_ACCESS_KEY: z.string().trim().min(1),
  POSTGRES_DATABASE: z.string().trim().min(1),
  POSTGRES_HOST: z.string().trim().min(1),
  POSTGRES_PASSWORD: z.string().trim().min(1),
  POSTGRES_PORT: z.string().trim().min(1),
  POSTGRES_USER: z.string().trim().min(1),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const checkEnv = async () => {
  const envParsed = await envSchema.safeParseAsync(process.env);

  if (!envParsed.success) {
    console.error(`ENV Variables not OK, err:`, envParsed.error.errors);
    process.exit(1);
  }
};
