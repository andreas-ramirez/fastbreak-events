import { getEvent, getSportTypes } from "@/app/actions/events";
import { EventForm } from "@/components/event/event-form";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ data: event }, { data: sportTypes }] = await Promise.all([
    getEvent(id),
    getSportTypes(),
  ]);

  if (!event) return notFound();

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <EventForm event={event} sportTypes={sportTypes ?? []} />
    </div>
  );
}
