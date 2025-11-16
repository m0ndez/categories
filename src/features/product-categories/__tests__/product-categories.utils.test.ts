import { describe, it, expect, beforeEach, vi } from "vitest";
import { formatDate } from "../utils/product-categories.utils";

describe("Product Categories Utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const dateString = "2025-11-15T11:12:55";
      const result = formatDate(dateString);

      expect(result).toBe("15/11/2025, 11:12:55");
    });

    it("should handle ISO date strings", () => {
      const dateString = "2025-11-15T11:12:55.000Z";
      const result = formatDate(dateString);

      // Note: This will vary based on timezone, so we just check format
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/);
    });

    it("should format midnight correctly", () => {
      const dateString = "2025-11-15T00:00:00";
      const result = formatDate(dateString);

      expect(result).toBe("15/11/2025, 00:00:00");
    });

    it("should format end of day correctly", () => {
      const dateString = "2025-11-15T23:59:59";
      const result = formatDate(dateString);

      expect(result).toBe("15/11/2025, 23:59:59");
    });

    it("should handle single digit days and months with padding", () => {
      const dateString = "2025-01-05T09:05:03";
      const result = formatDate(dateString);

      expect(result).toBe("05/01/2025, 09:05:03");
    });

    it("should use 24-hour format", () => {
      const dateString = "2025-11-15T13:30:45";
      const result = formatDate(dateString);

      expect(result).toContain("13:30:45");
      expect(result).not.toContain("PM");
    });

    it("should handle different years", () => {
      const dateString = "2024-12-31T23:59:59";
      const result = formatDate(dateString);

      expect(result).toBe("31/12/2024, 23:59:59");
    });
  });
});
