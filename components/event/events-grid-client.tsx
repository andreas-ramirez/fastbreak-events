"use client";

// import { useRouter } from "next/navigation";
import { EventCard } from "./event-card";
// import { deleteEvent } from "@/app/actions/events";
// import { toast } from "sonner";
import type { EventWithDetails } from "@/lib/types";
import { CreateEventButton } from "./event-create-button";

interface EventsGridClientProps {
  events: EventWithDetails[];
  currentUserId: string;
}

export function EventsGridClient({
  events,
  currentUserId,
}: EventsGridClientProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center py-16 space-y-4">
        <p className="text-muted-foreground text-lg lg:text-2xl">
          No events found
        </p>
        <p className="text-muted-foreground text-sm lg:text-lg">
          Create your first event to get started
        </p>
        <CreateEventButton isCTA={true} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          userOwned={event.user_id === currentUserId}
          //   onEdit={() => router.push(`/dashboard/${event.id}/edit`)}
          //   onDelete={() => handleDelete(event.id)}
          //   onView={() => router.push(`/dashboard/${event.id}`)}
        />
      ))}
    </div>
  );
}
