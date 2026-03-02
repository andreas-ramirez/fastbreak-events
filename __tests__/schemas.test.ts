import { describe, it, expect } from "vitest";
import { AuthSchema } from "@/lib/schemas/auth";
import { AUTH_MODE } from "@/lib/constants";
import { eventSchema } from "@/lib/schemas/event";

describe("Auth Schema", () => {
  describe("login", () => {
    const schema = AuthSchema(AUTH_MODE.LOGIN);

    it("passes with valid credentials", () => {
      const result = schema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("fails with invalid email", () => {
      const result = schema.safeParse({
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("fails with short password", () => {
      const result = schema.safeParse({
        email: "test@example.com",
        password: "12345",
      });
      expect(result.success).toBe(false);
    });

    it("fails with empty fields", () => {
      const result = schema.safeParse({
        email: "",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("signup", () => {
    const schema = AuthSchema(AUTH_MODE.SIGNUP);

    it("passes with matching passwords", () => {
      const result = schema.safeParse({
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("fails with mismatched passwords", () => {
      const result = schema.safeParse({
        email: "test@example.com",
        password: "password123",
        confirmPassword: "different",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("Event Schema", () => {
  const validEvent = {
    name: "Championship Game",
    sport_type_id: "abc-123",
    date: "2025-06-15",
    time: "18:00",
    description: "The big game",
    venues: [
      {
        name: "Stadium A",
        address: "123 Main St",
        city: "Charlotte",
        state: "NC",
      },
    ],
  };

  it("passes with valid event data", () => {
    const result = eventSchema.safeParse(validEvent);
    expect(result.success).toBe(true);
  });

  it("fails without event name", () => {
    const result = eventSchema.safeParse({ ...validEvent, name: "" });
    expect(result.success).toBe(false);
  });

  it("fails without sport type", () => {
    const result = eventSchema.safeParse({ ...validEvent, sport_type_id: "" });
    expect(result.success).toBe(false);
  });

  it("fails without date", () => {
    const result = eventSchema.safeParse({ ...validEvent, date: "" });
    expect(result.success).toBe(false);
  });

  it("fails without time", () => {
    const result = eventSchema.safeParse({ ...validEvent, time: "" });
    expect(result.success).toBe(false);
  });

  it("fails with no venues", () => {
    const result = eventSchema.safeParse({ ...validEvent, venues: [] });
    expect(result.success).toBe(false);
  });

  it("fails with venue missing name", () => {
    const result = eventSchema.safeParse({
      ...validEvent,
      venues: [{ name: "", address: "", city: "", state: "" }],
    });
    expect(result.success).toBe(false);
  });

  it("allows optional description", () => {
    const { description, ...withoutDesc } = validEvent;
    const result = eventSchema.safeParse(withoutDesc);
    expect(result.success).toBe(true);
  });

  it("allows multiple venues", () => {
    const result = eventSchema.safeParse({
      ...validEvent,
      venues: [
        { name: "Stadium A", address: "", city: "", state: "" },
        { name: "Stadium B", address: "", city: "", state: "" },
      ],
    });
    expect(result.success).toBe(true);
  });
});
