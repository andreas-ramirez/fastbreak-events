"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/auth";
import { ROUTES } from "@/lib/constants";
import { PlusIcon, ArrowLeft, LogOut } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const onDashboard = pathname === ROUTES.DASHBOARD;

  return (
    <nav className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
          <Link href={ROUTES.DASHBOARD} className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Fastbreak
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white/80">
              Events
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Context action */}
            {onDashboard ? (
              <Button
                asChild
                variant="submit"
                size="sm"
                className="bg-cta-gradient hover:opacity-90 shadow-lg shadow-indigo-500/15"
              >
                <Link href={ROUTES.CREATE_EVENT}>
                  <PlusIcon className="mr-2" />
                  <span className="hidden sm:inline">Create Event</span>
                  <span className="sm:hidden">Create</span>
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="bg-white/5 border px-2 border-white/10 text-slate-200 hover:bg-white/10 hover:text-white"
              >
                <Link href={ROUTES.DASHBOARD}>
                  <ArrowLeft />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </Link>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="hidden sm:flex border-white/15 bg-white/5 text-red-200 hover:bg-red-500/10 hover:text-red-100"
            >
              Sign Out
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="sm:hidden text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
