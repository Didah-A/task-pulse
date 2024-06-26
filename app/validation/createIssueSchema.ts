import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(3, "Title is required!").max(255),
  description: z.string().min(5, "Description is required!"),
  //   creator: z.object({
  //     name: z.string().max(255),
  //     creatorId: z.string(),
  //   }),
});
