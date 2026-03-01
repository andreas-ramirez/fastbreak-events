import { AuthForm } from "@/components/auth/auth-form";
import { AUTH_MODE } from "@/lib/constants";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm mode={AUTH_MODE.SIGNUP} />
      </div>
    </div>
  );
}
