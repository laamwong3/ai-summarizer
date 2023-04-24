import { z } from "zod";

export const getSummarySchema = z.object({
  url: z.string().url({ message: "must be a valid url" }),
});

export type TGetSummary = z.infer<typeof getSummarySchema>;
