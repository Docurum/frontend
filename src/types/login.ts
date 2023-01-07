import { z } from "zod";
import loginSchema from "../schemas/loginSchema";

export type loginSchemaType = z.infer<typeof loginSchema>;
