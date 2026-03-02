import {
  MdSportsFootball,
  MdSportsHockey,
  MdSportsBasketball,
  MdSportsTennis,
  MdSportsBaseball,
  MdSportsSoccer,
} from "react-icons/md";
import { FaMedal } from "react-icons/fa";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  DASHBOARD: "/event/dashboard",
  CREATE_EVENT: "/event/create",
  EDIT_EVENT: (id: string) => `/event/${id}/edit`,
  VIEW_EVENT: (id: string) => `/event/${id}`,
} as const;

export const AUTH_MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const;

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export const SPORT_CONFIG: Record<string, { icon: React.ElementType }> = {
  Soccer: {
    icon: MdSportsSoccer,
  },
  Basketball: {
    icon: MdSportsBasketball,
  },
  Tennis: {
    icon: MdSportsTennis,
  },
  Baseball: {
    icon: MdSportsBaseball,
  },
  Hockey: {
    icon: MdSportsHockey,
  },
  Football: {
    icon: MdSportsFootball,
  },
};

export const SPORT_CONFIG_DEFAULT = {
  color: "bg-white/10 text-slate-100 border border-white/15",
  stripe: "#94a3b8",
  icon: FaMedal,
};

export const TOAST_MESSAGES = {
  EVENT_CREATED: "Event created successfully",
  EVENT_UPDATED: "Event updated successfully",
  EVENT_DELETED: "Event deleted successfully",
  EVENT_CREATE_ERROR: "Failed to create event",
  EVENT_UPDATE_ERROR: "Failed to update event",
  EVENT_DELETE_ERROR: "Failed to delete event",
  LOGIN_ERROR: "Invalid email or password.",
  SIGNUP_ERROR: "Unable to create account. Please try again.",
  AUTH_REQUIRED: "Not authenticated.",
} as const;

export const ERROR_MESSAGES = {
  EVENTS_LOAD: "Unable to load events. Please try again later.",
  EVENT_LOAD: "Unable to load event details.",
  SPORT_TYPES_LOAD: "Unable to load sport types.",
  GENERIC: "Something went wrong. Please try again.",
} as const;

export const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;
