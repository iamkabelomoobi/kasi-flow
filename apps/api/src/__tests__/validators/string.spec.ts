import { stringValidator } from "../../validators/string.validator";
import crypto from "crypto";

jest.mock("crypto", () => ({
  timingSafeEqual: jest.fn().mockImplementation((buf1, buf2) => {
    if (buf1.length !== buf2.length) return false;
    
    for (let i = 0; i < buf1.length; i++) {
      if (buf1[i] !== buf2[i]) return false;
    }
    return true;
  })
}));

describe("stringValidator", () => {
  describe("Basic functionality", () => {
    it("should return true for identical strings", () => {
      const result = stringValidator("test", "test");
      expect(result).toBe(true);
    });

    it("should return false for different strings", () => {
      const result = stringValidator("test", "other");
      expect(result).toBe(false);
    });

    it("should be case sensitive", () => {
      const result = stringValidator("Test", "test");
      expect(result).toBe(false);
    });
  });

  describe("Whitespace handling", () => {
    it("should trim whitespace by default", () => {
      const result = stringValidator(" test ", "test");
      expect(result).toBe(true);
    });

    it("should respect the trimWhitespace option when false", () => {
      const result = stringValidator(" test", "test", { trimWhitespace: false });
      expect(result).toBe(false);
    });

    it("should treat multiple spaces the same after trimming", () => {
      const result = stringValidator("   test   ", "test");
      expect(result).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty strings", () => {
      const result = stringValidator("", "");
      expect(result).toBe(true);
    });

    it("should handle null values", () => {
      const result = stringValidator(null, null);
      expect(result).toBe(true);
    });

    it("should handle undefined values", () => {
      const result = stringValidator(undefined, undefined);
      expect(result).toBe(true);
    });

    it("should handle comparing null with empty string", () => {
      const result = stringValidator(null, "");
      expect(result).toBe(true);
    });

    it("should return false when comparing null with non-empty string", () => {
      const result = stringValidator(null, "test");
      expect(result).toBe(false);
    });
  });

  describe("Security properties", () => {
    it("should compare strings with special characters", () => {
      const result = stringValidator("!@#$%^&*()", "!@#$%^&*()");
      expect(result).toBe(true);
    });

    it("should compare strings with Unicode characters", () => {
      const result = stringValidator("こんにちは", "こんにちは");
      expect(result).toBe(true);
    });

    it("should compare strings with emojis", () => {
      const result = stringValidator("Hello 👋", "Hello 👋");
      expect(result).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should handle exceptions gracefully", () => {
      // Set up the mock to throw an error
      (crypto.timingSafeEqual as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Mock error");
      });

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = stringValidator("test", "test");
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in stringValidator:",
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });
});
