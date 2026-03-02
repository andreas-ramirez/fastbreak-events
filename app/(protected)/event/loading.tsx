export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-32 bg-muted rounded" />
    </div>
  );
}
