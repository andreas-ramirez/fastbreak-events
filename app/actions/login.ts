"use server";

import { loginSchema, type LoginFormValues } from "@/lib/schemas/login";

export async function login(data: LoginFormValues) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const { email, password } = parsed.data;

  // TODO: your auth logic here (e.g. check DB, create session, etc.)
  console.log("Login attempt:", email);

  return { success: true };
}