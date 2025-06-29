import { emailValidator } from "../../validators";

describe("emailValidator", () => {
  it("should return valid result for a valid email", () => {
    const result = emailValidator("user@example.com");
    expect(result.isValid).toBe(true);
    expect(result.data).toBe("user@example.com");
    expect(result.errors).toBeUndefined();
  });

  it("should return error for an empty string", () => {
    const result = emailValidator("");
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toBe(
      "Email cannot be just spaces or empty."
    );
  });

  it("should return error for a whitespace-only string", () => {
    const result = emailValidator("   ");
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toBe(
      '"value" must not have leading or trailing whitespace'
    );
  });

  it("should return error for an invalid format", () => {
    const result = emailValidator("not-an-email");
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toBe(
      "Please enter a valid email address."
    );
  });

  it("should return error for a blocked domain (protonmail.com)", () => {
    const result = emailValidator("user@protonmail.com");
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toBe(
      "We currently do not accept emails from that provider."
    );
  });

  it("should return error for a blocked domain (tutanota.io)", () => {
    const result = emailValidator("someone@tutanota.io");
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0]).toBe(
      "We currently do not accept emails from that provider."
    );
  });

  it("should return valid result for a non-blocked, well-formed email", () => {
    const result = emailValidator("john.doe@gmail.com");
    expect(result.isValid).toBe(true);
    expect(result.data).toBe("john.doe@gmail.com");
    expect(result.errors).toBeUndefined();
  });
});
