import { z } from "zod";
import { emailSchema, passwordSchema, usernameSchema } from ".";

const loginSchema = z
  .object({
    emailOrUsername: z.union([usernameSchema, emailSchema]),
    password: passwordSchema,
  })
  .strict();

export default loginSchema;
