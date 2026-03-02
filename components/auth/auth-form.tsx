"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AuthSchema,
  type SignupFormValues,
  type LoginFormValues,
} from "@/lib/schemas/auth";
import { signIn, signUp } from "@/app/actions/auth";
import { toast } from "sonner";
import {
  AUTH_MODE,
  type AuthMode,
  ROUTES,
  TOAST_MESSAGES,
} from "@/lib/constants";
import Link from "next/link";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === AUTH_MODE.LOGIN;
  const schema = AuthSchema(mode);

  const form = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === AUTH_MODE.SIGNUP && { confirmPassword: "" }),
    },
  });

  async function onSubmit(values: LoginFormValues | SignupFormValues) {
    const action = isLogin ? signIn : signUp;
    const result = await action({
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error(
        isLogin ? TOAST_MESSAGES.LOGIN_ERROR : TOAST_MESSAGES.SIGNUP_ERROR,
      );
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border border-white/10 bg-white/5 backdrop-blur shadow-2xl shadow-black/35">
        <CardHeader className="space-y-2 pt-6">
          <CardTitle className="text-2xl mx-auto font-bold tracking-tight text-white">
            {isLogin ? "Sign In" : "Create Account"}
          </CardTitle>

          <CardDescription className="text-slate-300">
            {isLogin
              ? "Enter your email below to sign in to your account"
              : "Enter your details to create a new account"}
          </CardDescription>
          <div className="pt-2 border-t border-white/10" />
        </CardHeader>
        <CardContent className="pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {mode === AUTH_MODE.SIGNUP && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              )}
              <div className="mt-12">
                {" "}
                <Button
                  type="submit"
                  variant="submit"
                  className="w-full btn-gradient text-white font-semibold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? isLogin
                      ? "Signing in..."
                      : "Creating account..."
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
                </Button>
              </div>

              <p className="text-sm text-center text-slate-300">
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link
                      href={ROUTES.SIGNUP}
                      className="text-indigo-200 hover:text-indigo-100 underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link
                      href={ROUTES.LOGIN}
                      className="text-indigo-200 hover:text-indigo-100 underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
