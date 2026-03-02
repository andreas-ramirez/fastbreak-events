export type SportType = {
  id: string;
  name: string;
};

export type Venue = {
  id: string;
  event_id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
};

export type Event = {
  id: string;
  user_id: string;
  name: string;
  sport_type_id: string;
  date_time: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type EventWithDetails = Event & {
  sport_type: SportType;
  venues: Venue[];
};

export type EventFormData = {
  name: string;
  sport_type_id: string;
  date_time: string;
  description?: string;
  venues: Omit<Venue, "id" | "event_id">[];
};
