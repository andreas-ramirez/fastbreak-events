"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AuthSchema,
  SignupFormValues,
  LoginFormValues,
} from "@/lib/schemas/auth";
import { signIn, signUp } from "@/app/actions/auth";
import { toast } from "sonner";
import { AuthMode } from "@/lib/constants";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const schema = AuthSchema(mode);

  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" && { confirmPassword: "" }),
    },
  });

  async function onSubmit(values: LoginFormValues | SignupFormValues) {
    setServerError(null);
    setLoading(true);

    const action = mode === "login" ? signIn : signUp;
    const result = await action({
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    }

    // TODO: redirect or update UI on success
  }

  return (
    <div className={"flex flex-col gap-6 max-w-md"}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-secondary">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {mode === "signup" && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {serverError && (
                <p className="text-destructive text-sm">{serverError}</p>
              )}
              <Button
                type="submit"
                className="w-full text-secondary btn-gradient"
                disabled={form.formState.isSubmitting}
              >
                {mode === "signup" ? "Sign Up" : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
