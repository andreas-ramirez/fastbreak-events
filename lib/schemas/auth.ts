import { z } from "zod";

const baseAuthSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = baseAuthSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export function AuthSchema(mode: "login" | "signup") {
  return mode === "signup" ? signupSchema : baseAuthSchema;
}

export type LoginFormValues = z.infer<typeof baseAuthSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
