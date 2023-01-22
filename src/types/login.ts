import { z } from "zod";
import loginSchema from "../schemas/loginSchema";
import { emailSchema } from "../schemas";

export type loginSchemaType = z.infer<typeof loginSchema>;

export const emailValidation = z.object({
  email: emailSchema,
});
export type emailSchemaType = z.infer<typeof emailValidation>;
