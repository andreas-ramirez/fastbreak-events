import { describe, it, expect } from "vitest";
import {
  SPORT_CONFIG,
  SPORT_CONFIG_DEFAULT,
  ROUTES,
  US_STATES,
} from "@/lib/constants";

describe("Sport Config", () => {
  it("has config for all seeded sports", () => {
    const expected = [
      "Soccer",
      "Basketball",
      "Tennis",
      "Baseball",
      "Hockey",
      "Football",
    ];
    expected.forEach((sport) => {
      expect(SPORT_CONFIG[sport]).toBeDefined();
      expect(SPORT_CONFIG[sport].icon).toBeTruthy();
    });
  });

  it("has a default config", () => {
    expect(SPORT_CONFIG_DEFAULT.icon).toBeTruthy();
  });

  it("returns default for unknown sport", () => {
    const config = SPORT_CONFIG["Curling"] ?? SPORT_CONFIG_DEFAULT;
    expect(config).toEqual(SPORT_CONFIG_DEFAULT);
  });
});

describe("Routes", () => {
  it("generates correct event routes", () => {
    expect(ROUTES.VIEW_EVENT("abc-123")).toContain("abc-123");
    expect(ROUTES.EDIT_EVENT("abc-123")).toContain("abc-123");
    expect(ROUTES.EDIT_EVENT("abc-123")).toContain("edit");
  });
});

describe("US States", () => {
  it("has all 50 states", () => {
    expect(US_STATES).toHaveLength(50);
  });

  it("includes NC", () => {
    expect(US_STATES).toContain("NC");
  });
});
