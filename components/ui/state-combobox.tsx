"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { US_STATES } from "@/lib/constants";

interface StateComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function StateCombobox({ value, onChange }: StateComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            "bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 hover:border-white/15",
            "focus-visible:ring-2 focus-visible:ring-indigo-300/30 focus-visible:ring-offset-0",
            !value && "text-slate-400",
          )}
        >
          {value || "State"}
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-300 opacity-80" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-slate-950/60 border-white/10 text-slate-100 backdrop-blur-xl shadow-xl shadow-black/30">
        <Command className="bg-transparent text-slate-100">
          <CommandInput
            placeholder="Search state..."
            className="h-10 border-b border-white/10 bg-transparent text-slate-100 placeholder:text-slate-400"
          />
          <CommandList className="max-h-64">
            <CommandEmpty className="py-6 text-center text-sm text-slate-300">
              No state found.
            </CommandEmpty>

            <CommandGroup className="p-1">
              {US_STATES.map((state) => (
                <CommandItem
                  key={state}
                  value={state}
                  onSelect={() => {
                    onChange(state);
                    setOpen(false);
                  }}
                  className="rounded-md text-slate-100 data-[selected=true]:bg-white/10 data-[selected=true]:text-white aria-selected:bg-white/10 aria-selected:text-white"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 mr-2 text-lime-200",
                      value === state ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {state}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
