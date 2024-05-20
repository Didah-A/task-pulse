import { z } from "zod";

export const userSchemaValidator = z.object({
  name: z.string().min(5, "Name is required!").optional(),
  email: z.string().min(5, "Email is required!"),
  password: z.string().min(5, "Password should be atleast 5 characters!"),
});
