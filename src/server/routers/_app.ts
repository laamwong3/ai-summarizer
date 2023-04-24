import { z } from "zod";
import { procedure, router } from "../trpc";
import { getSummarySchema } from "./summarizer.schema";
import { getSummaryController } from "./summarizer.controller";

export const appRouter = router({
  getSummary: procedure
    .input(getSummarySchema)
    .mutation(({ input }) => getSummaryController(input)),
});

export type AppRouter = typeof appRouter;
