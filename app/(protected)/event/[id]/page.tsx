import { getEvent } from "@/app/actions/events";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/event/event-details";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: event, error } = await getEvent(id);

  if (error || !event) return notFound();

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <EventDetail event={event} canManage={event.user_id === user?.id} />
    </div>
  );
}
