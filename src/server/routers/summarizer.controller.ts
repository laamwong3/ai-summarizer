import { TRPCError } from "@trpc/server";
import { getSummarySchema, TGetSummary } from "./summarizer.schema";

export const getSummaryController = async () => {
  try {
    return {};
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get food categories",
      cause: error,
    });
  }
};
