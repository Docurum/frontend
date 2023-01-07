import { z } from "zod";

export const nameSchema = z.string().min(3).max(80).trim();

export const usernameSchema = z
  .string()
  .min(4)
  .max(20)
  // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
  .regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gm)
  .trim()
  .transform((username) => username.toLocaleLowerCase());

export const emailSchema = z.string().min(4).max(60).email().trim();

export const passwordSchema = z
  .string()
  .min(8)
  .max(50)
  // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm, "Must contain at least one uppercase letter, one lowercase letter, one number and one special character.")
  .trim();
