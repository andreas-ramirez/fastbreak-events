import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export function CreateEventButton({ isCTA }: { isCTA: boolean }) {
  return (
    <Button
      asChild
      size={isCTA ? "xl" : "default"}
      className={
        "relative overflow-hidden " +
        "bg-cta-gradient " +
        "font-semibold " +
        "shadow-lg shadow-indigo-500/25 " +
        "hover:shadow-xl hover:shadow-indigo-400/30 " +
        "active:translate-y-[1px] transition"
      }
      variant={isCTA ? "default" : "ghost"}
    >
      <Link href={ROUTES.CREATE_EVENT}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Create Event
      </Link>
    </Button>
  );
}
