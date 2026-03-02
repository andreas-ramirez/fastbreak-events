import { getEvents } from "@/app/actions/events";
import { createClient } from "@/lib/supabase/server";
import { EventsGridClient } from "./events-grid-client";
import { ERROR_MESSAGES } from "@/lib/constants";

interface EventsGridProps {
  search?: string;
  sport?: string;
}

export async function EventsGrid({ search, sport }: EventsGridProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: events, error } = await getEvents(search, sport);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-destructive">Failed to load events</p>
        <p className="text-sm text-muted-foreground">
          {ERROR_MESSAGES.EVENTS_LOAD}
        </p>
      </div>
    );
  }
  return (
    <EventsGridClient events={events ?? []} currentUserId={user?.id ?? ""} />
  );
}
