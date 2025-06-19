import { z } from "zod";
import { loginSchema, registerSchema, sessionSchema } from "./zod/schema";

export type RegisterType = z.infer<typeof registerSchema>;

export type LoginType = z.infer<typeof loginSchema>;

export type UserType = z.infer<typeof sessionSchema>;
