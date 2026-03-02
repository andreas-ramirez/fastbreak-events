"use server";

import { ROUTES, TOAST_MESSAGES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { EventFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getEvents(search?: string, sportTypeId?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*, sport_type:sport_types(id, name), venues(*)")
    .order("date_time", { ascending: true });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (sportTypeId) {
    query = query.eq("sport_type_id", sportTypeId);
  }

  const { data, error } = await query;

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, data, error: null };
}

export async function getSportTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sport_types")
    .select("id, name")
    .order("name");

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, data, error: null };
}

export async function createEvent(eventData: EventFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: TOAST_MESSAGES.AUTH_REQUIRED };

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert({
      user_id: user.id,
      name: eventData.name,
      sport_type_id: eventData.sport_type_id,
      date_time: eventData.date_time,
      description: eventData.description,
    })
    .select()
    .single();

  if (eventError) return { success: false, error: eventError.message };

  if (eventData.venues.length > 0) {
    const { error: venueError } = await supabase
      .from("venues")
      .insert(eventData.venues.map((v) => ({ ...v, event_id: event.id })));

    if (venueError) return { success: false, error: venueError.message };
  }

  revalidatePath(ROUTES.DASHBOARD);
  return { success: true, error: null };
  // No redirect here — let the client handle it
}

export async function updateEvent(eventId: string, eventData: EventFormData) {
  const supabase = await createClient();

  const { error: eventError } = await supabase
    .from("events")
    .update({
      name: eventData.name,
      sport_type_id: eventData.sport_type_id,
      date_time: eventData.date_time,
      description: eventData.description,
    })
    .eq("id", eventId);

  if (eventError) return { success: false, error: eventError.message };

  await supabase.from("venues").delete().eq("event_id", eventId);

  if (eventData.venues.length > 0) {
    const { error: venueError } = await supabase
      .from("venues")
      .insert(eventData.venues.map((v) => ({ ...v, event_id: eventId })));

    if (venueError) return { success: false, error: venueError.message };
  }

  revalidatePath(ROUTES.DASHBOARD);
  return { success: true, error: null };
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) return { success: false, error: error.message };

  revalidatePath(ROUTES.DASHBOARD);
  return { success: true, error: null };
}

export async function getEvent(eventId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*, sport_type:sport_types(id, name), venues(*)")
    .eq("id", eventId)
    .single();

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, data, error: null };
}
