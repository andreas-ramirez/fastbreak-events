import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
          </div>
        }
      >
        <Navbar />
      </Suspense>
      <div className="mx-auto min-h-screen max-w-6xl px-6 py-10">
        <main>{children}</main>
      </div>
    </>
  );
}
