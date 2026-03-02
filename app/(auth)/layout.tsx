export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-24 right-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        {children}
      </div>
    </div>
  );
}
