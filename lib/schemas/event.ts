import z from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  sport_type_id: z.string().min(1, "Sport type is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  description: z.string().optional(),
  venues: z
    .array(
      z.object({
        name: z.string().min(1, "Venue name is required"),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
      }),
    )
    .min(1, "At least one venue is required"),
});

export type EventFormValues = z.infer<typeof eventSchema>;
