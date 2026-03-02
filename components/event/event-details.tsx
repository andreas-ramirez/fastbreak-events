"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { deleteEvent } from "@/app/actions/events";
import { toast } from "sonner";
import {
  SPORT_CONFIG,
  SPORT_CONFIG_DEFAULT,
  ROUTES,
  TOAST_MESSAGES,
} from "@/lib/constants";
import type { EventWithDetails } from "@/lib/types";

interface EventDetailProps {
  event: EventWithDetails;
  canManage: boolean;
}

export function EventDetail({ event, canManage }: EventDetailProps) {
  const router = useRouter();
  const sportKey = (event.sport_type.name ?? "").trim();
  const config = SPORT_CONFIG[sportKey] ?? SPORT_CONFIG_DEFAULT;

  async function handleDelete() {
    const result = await deleteEvent(event.id);
    if (result.success) {
      toast.success(TOAST_MESSAGES.EVENT_DELETED);
      router.push(ROUTES.DASHBOARD);
    } else {
      toast.error(result.error ?? TOAST_MESSAGES.EVENT_DELETE_ERROR);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6 shadow-xl shadow-black/25">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(ROUTES.DASHBOARD)}
              className="w-full sm:w-auto justify-start text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            {canManage && (
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end sm:items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(ROUTES.EDIT_EVENT(event.id))}
                  className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="border-white/15 bg-white/5 text-red-200 hover:bg-red-500/10 hover:text-red-100"
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {event.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="sport"
                  className="w-fit bg-lime-400/15 text-lime-200 border border-lime-300/50 ring-1 ring-inset ring-lime-300/25"
                >
                  <config.icon className="h-3.5 w-3.5 mr-1 text-current" />
                  {sportKey}
                </Badge>

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
              </div>
            </div>
          </div>
        </div>
      </div>
      {event.description && (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6">
          <h2 className="text-white font-semibold mb-2">Description</h2>
          <p className="text-slate-300 leading-relaxed">{event.description}</p>
        </div>
      )}
      <div className="space-y-3">
        <h2 className="text-white font-semibold">
          Venues <span className="text-slate-400">({event.venues.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {event.venues.map((venue) => (
            <Card
              key={venue.id}
              className="border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors"
            >
              <CardContent className="pt-4 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-200/80" />
                  <p className="font-medium text-white">{venue.name}</p>
                </div>

                {(venue.address || venue.city || venue.state) && (
                  <p className="text-sm text-slate-300 pl-6">
                    {[venue.address, venue.city, venue.state]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
