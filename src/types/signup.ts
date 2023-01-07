import { z } from "zod";
import registerSchema from "../schemas/registerSchema";

export type registerSchemaType = z.infer<typeof registerSchema>;
