"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventFormValues } from "@/lib/schemas/event";
import { createEvent, updateEvent } from "@/app/actions/events";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { ROUTES, TOAST_MESSAGES } from "@/lib/constants";
import type { SportType, EventWithDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import { StateCombobox } from "../ui/state-combobox";
import { Badge } from "../ui/badge";

interface EventFormProps {
  sportTypes: SportType[];
  event?: EventWithDetails; // passed in for edit mode
}

export function EventForm({ sportTypes, event }: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!event;
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name ?? "",
      sport_type_id: event?.sport_type_id ?? "",
      date: event?.date_time ? event.date_time.slice(0, 10) : "",
      time: event?.date_time ? event.date_time.slice(11, 16) : "",
      description: event?.description ?? "",
      venues: event?.venues.map((v) => ({
        name: v.name,
        address: v.address ?? "",
        city: v.city ?? "",
        state: v.state ?? "",
      })) ?? [{ name: "", address: "", city: "", state: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "venues",
  });

  async function onSubmit(values: EventFormValues) {
    setLoading(true);

    const payload = {
      ...values,
      date_time: `${values.date}T${values.time}`,
    };

    const result = isEditing
      ? await updateEvent(event.id, payload)
      : await createEvent(payload);

    if (result.success) {
      toast.success(
        isEditing ? TOAST_MESSAGES.EVENT_UPDATED : TOAST_MESSAGES.EVENT_CREATED,
      );
      router.push(ROUTES.DASHBOARD);
    } else {
      toast.error(result.error ?? TOAST_MESSAGES.EVENT_CREATE_ERROR);
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6 shadow-xl shadow-black/25 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                {isEditing ? "Edit Event" : "Create Event"}
              </h1>
              <p className="mt-1 text-slate-300">
                {isEditing
                  ? "Update details and venues for this event."
                  : "Add the basics, then list one or more venues."}
              </p>
            </div>

            <Badge
              variant="sport"
              className="w-fit bg-lime-400/15 text-lime-200 border border-lime-300/50 ring-1 ring-inset ring-lime-300/25"
            >
              Fastbreak
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">Basics</h2>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter event name"
                      className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sport_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Sport Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-white/10 border-white/10 text-slate-200 focus:ring-indigo-400/40">
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="bg-slate-950/95 border-white/10 text-slate-100 backdrop-blur">
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
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white/10 border-white/10 text-slate-200 focus-visible:ring-indigo-400/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="bg-white/10 border-white/10 text-slate-200 focus-visible:ring-indigo-400/40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the event..."
                      className="min-h-[110px] bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-white font-semibold">Venues</h2>
                <p className="text-sm text-slate-300">
                  Add one or more places people can show up.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ name: "", address: "", city: "", state: "" })
                }
                className="border-lime-300/40 bg-lime-400/10 text-lime-200 hover:bg-lime-400/15"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Venue
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((venueField, index) => (
                <Card
                  key={venueField.id}
                  className="border border-white/10 bg-white/5 backdrop-blur"
                >
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        Venue {index + 1}
                      </p>

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-200 hover:text-red-100 hover:bg-red-500/10"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`venues.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Venue Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter venue name"
                              className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`venues.${index}.address`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">
                              Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Address"
                                className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`venues.${index}.city`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                className="bg-white/10 border-white/10 text-slate-200 placeholder:text-slate-400 focus-visible:ring-indigo-400/40"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`venues.${index}.state`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">
                              State
                            </FormLabel>
                            <FormControl>
                              <StateCombobox
                                value={field.value ?? ""}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {form.formState.errors.venues?.root && (
              <p className="text-sm text-red-300">
                {form.formState.errors.venues.root.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant={"submit"}
            className="w-full"
            disabled={loading}
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Update Event"
                : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
