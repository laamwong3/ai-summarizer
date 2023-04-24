import { TRPCError } from "@trpc/server";
import { getSummarySchema, TGetSummary } from "./summarizer.schema";
import { IGetSummaryResults } from "./summarizer.type";

/**
 * Calls the article-extractor-and-summarizer API to generate a summary of the given URL.
 *
 * @param url - The URL of the article to summarize.
 * @returns An object containing the summarized result.
 * @throws TRPCError with code "INTERNAL_SERVER_ERROR" if there was an issue getting the summary.
 */

export const getSummaryController = async ({ url }: TGetSummary) => {
  const link = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${url}`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  };

  try {
    const response = await fetch(link, options);
    const result = (await response.json()) as IGetSummaryResults;

    return { result };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get summary",
      cause: error,
    });
  }
};
