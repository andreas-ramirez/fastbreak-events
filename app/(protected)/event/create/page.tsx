import { getSportTypes } from "@/app/actions/events";
import { EventForm } from "@/components/event/event-form";

export default async function CreateEventPage() {
  const { data: sportTypes } = await getSportTypes();

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <EventForm sportTypes={sportTypes ?? []} />
    </div>
  );
}
