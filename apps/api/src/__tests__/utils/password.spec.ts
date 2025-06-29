import { PasswordUtil } from "../../utils/password.util";

// Mock the environment variables directly
jest.mock("../../utils/password.util", () => {
  const originalModule = jest.requireActual("../../utils/password.util");

  return {
    ...originalModule,
    getPepper: (role: string) => {
      if (role === "admin") return "adminPepper";
      if (role === "client") return "clientPepper";
      return null;
    },
  };
});

describe("PasswordUtil", () => {
  const password = "TestPassword123!";

  it("hashes and verifies password for admin", async () => {
    const hash = await PasswordUtil.hash("admin", password);
    expect(typeof hash).toBe("string");
    const isValid = await PasswordUtil.compare("admin", password, hash);
    expect(isValid).toBe(true);
  });

  it("hashes and verifies password for client", async () => {
    const hash = await PasswordUtil.hash("client", password);
    expect(typeof hash).toBe("string");
    const isValid = await PasswordUtil.compare("client", password, hash);
    expect(isValid).toBe(true);
  });

  it("throws error for invalid role in hash", async () => {
    await expect(PasswordUtil.hash("invalid", password)).rejects.toThrow(
      "Invalid user role"
    );
  });

  it("throws error for invalid role in compare", async () => {
    await expect(
      PasswordUtil.compare("invalid", password, "hash")
    ).rejects.toThrow("Invalid user role");
  });

  it("returns false for invalid password", async () => {
    const hash = await PasswordUtil.hash("admin", password);
    const isValid = await PasswordUtil.compare("admin", "wrongPassword", hash);
    expect(isValid).toBe(false);
  });
});
