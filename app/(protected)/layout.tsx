import { Navbar } from "@/components/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen app-bg-indigo">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <main>{children}</main>
      </div>
    </div>
  );
}
