import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema, usernameSchema } from ".";

const clinicSchema = z
  .object({
    name: z.string().min(4, "Name must contain at least 4 characters").max(150, "Name must contain at most 150 characters").trim(),
    email: emailSchema,
    phoneNumber: z.string(),
    type: z.string(),
    address: z.string().min(5, "Adrress must contain minimum 5 letters"),
    country: z.string().min(2, "Country must contain minimum 2 letters"),
    pincode: z.string(),
    state: z.string().min(2, "State must contain minimum 2 letters"),
    city: z.string().min(5, "City must contain minimum 2 letters"),
    displayImages: z.string().array(),
    logo: z.string().nullish(),
  })
  .strict();

export default clinicSchema;
