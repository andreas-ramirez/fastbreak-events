"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventWithDetails } from "@/lib/types";
import { ROUTES, SPORT_CONFIG, SPORT_CONFIG_DEFAULT } from "@/lib/constants";

interface EventCardProps {
  event: EventWithDetails;
  userOwned: boolean;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  const config = SPORT_CONFIG[event.sport_type.name] ?? SPORT_CONFIG_DEFAULT;

  return (
    <Card
      onClick={() => router.push(ROUTES.VIEW_EVENT(event.id))}
      className={[
        "group cursor-pointer flex flex-col overflow-hidden",
        "bg-white/5 border border-white/10 backdrop-blur",
        "transition-all duration-200 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1",
      ].join(" ")}
    >
      <div className="h-1 w-full bg-indigo-500/70" />
      <CardContent className="flex-1 pt-5 flex flex-col gap-3">
        <Badge
          variant="sport"
          className={
            "bg-lime-400/15 text-lime-200 border border-lime-300/50 ring-lime-300/25 w-fit ring-1 ring-inset"
          }
        >
          <config.icon className="h-3.5 w-3.5 mr-1 text-current" />
          {event.sport_type.name}
        </Badge>
        <p className="font-semibold text-md leading-snug text-white group-hover:text-indigo-200 transition-colors">
          {event.name}
        </p>
        <div className="flex items-center gap-2 text-slate-300">
          <CalendarDays className="h-5 w-5 text-indigo-200/80" />
          <span className="text-sm">
            {new Date(event.date_time).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-slate-300">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-200/80" />
          <span>
            {event.venues.length}{" "}
            {event.venues.length === 1 ? "venue" : "venues"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
