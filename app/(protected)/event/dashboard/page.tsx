import { Suspense } from "react";
import { getSportTypes } from "@/app/actions/events";
import { EventsGrid } from "@/components/event/events-grid";
import { EventFilters } from "@/components/event/event-filters";
import { LoaderCircle } from "lucide-react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sport?: string }>;
}) {
  const params = await searchParams;
  const { data: sportTypes } = await getSportTypes();

  return (
    <div className="mx-auto h-full my-auto max-w-5xl p-6 space-y-6">
      <div>
        <p className="text-sm font-medium text-sky-200/90">Fastbreak Events</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Find your next game.
        </h1>
        <p className="mt-2 text-slate-200/90 max-w-xl">
          Create events, track what’s coming up, and never miss a kickoff.
        </p>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur p-4 md:p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Events</h2>
        </div>

        <div className="mt-4">
          <EventFilters sportTypes={sportTypes ?? []} />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <LoaderCircle className="h-6 w-6 md:h-24 md:w-24 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <EventsGrid search={params.search} sport={params.sport} />
      </Suspense>
    </div>
  );
}
