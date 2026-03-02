"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function EventFilters({
  sportTypes,
}: {
  sportTypes: { id: string; name: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, searchParams, pathname],
  );

  function handleSearch(value: string) {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => updateParams("search", value), 600));
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Search events..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className={[
          "max-w-sm",
          "bg-white/10 border-white/10 text-white placeholder:text-slate-400",
          "focus-visible:ring-indigo-400/40",
        ].join(" ")}
      />

      <Select
        defaultValue={searchParams.get("sport") ?? "all"}
        onValueChange={(value) => updateParams("sport", value)}
      >
        <SelectTrigger
          className={[
            "w-48",
            "bg-white/10 border-white/10 text-white",
            "focus:ring-indigo-400/40",
          ].join(" ")}
        >
          <SelectValue placeholder="All Sports" />
        </SelectTrigger>

        <SelectContent className="bg-slate-950/60 border-white/10 text-slate-100 backdrop-blur">
          <SelectItem value="all" className="focus:bg-white/10">
            All Sports
          </SelectItem>
          {sportTypes.map((sport) => (
            <SelectItem
              key={sport.id}
              value={sport.id}
              className="focus:bg-white/10"
            >
              {sport.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
