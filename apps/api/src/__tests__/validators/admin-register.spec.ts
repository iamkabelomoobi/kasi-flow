import { adminRegisterValidator } from "../../validators";
import { interfaces } from "@kasi-flow/shared";

describe("adminRegisterValidator", () => {
  const validAdminData: interfaces.IAdminRegister = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    password: "ValidPassword123!",
    type: "super-admin",
  };

  describe("Valid data", () => {
    it("should return valid result for complete admin data", () => {
      const result = adminRegisterValidator(validAdminData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.firstName).toBe("John");
        expect(result.data.lastName).toBe("Doe");
        expect(result.data.email).toBe("john.doe@example.com");
      }
    });

    it("should return valid result without optional type field", () => {
      const dataWithoutType = { ...validAdminData };
      delete (dataWithoutType as Partial<interfaces.IAdminRegister>).type;
      
      const result = adminRegisterValidator(dataWithoutType);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeDefined();
    });
  });

  describe("Invalid firstName", () => {
    it("should return error for empty firstName", () => {
      const invalidData = { ...validAdminData, firstName: "" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name cannot be empty");
    });

    it("should return error for firstName with numbers", () => {
      const invalidData = { ...validAdminData, firstName: "John123" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name can only contain letters");
    });

    it("should return error for firstName with special characters", () => {
      const invalidData = { ...validAdminData, firstName: "John@" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name can only contain letters");
    });

    it("should return error for missing firstName", () => {
      const invalidData = { ...validAdminData };
      delete (invalidData as Partial<interfaces.IAdminRegister>).firstName;
      const result = adminRegisterValidator(invalidData as interfaces.IAdminRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("\"firstName\" is required");
    });
  });

  describe("Invalid lastName", () => {
    it("should return error for empty lastName", () => {
      const invalidData = { ...validAdminData, lastName: "" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Last name cannot be empty");
    });

    it("should return error for lastName with numbers", () => {
      const invalidData = { ...validAdminData, lastName: "Doe123" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Last name can only contain letters");
    });

    it("should return error for missing lastName", () => {
      const invalidData = { ...validAdminData };
      delete (invalidData as Partial<interfaces.IAdminRegister>).lastName;
      const result = adminRegisterValidator(invalidData as interfaces.IAdminRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("\"lastName\" is required");
    });
  });

  describe("Invalid email", () => {
    it("should return error for invalid email format", () => {
      const invalidData = { ...validAdminData, email: "invalid-email" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("email"))).toBe(true);
    });

    it("should return error for empty email", () => {
      const invalidData = { ...validAdminData, email: "" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email cannot be just spaces or empty.");
    });

    it("should return error for missing email", () => {
      const invalidData = { ...validAdminData };
      delete (invalidData as Partial<interfaces.IAdminRegister>).email;
      const result = adminRegisterValidator(invalidData as interfaces.IAdminRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email is required and cannot be empty.");
    });
  });

  describe("Invalid phone", () => {
    it("should return error for invalid phone format", () => {
      const invalidData = { ...validAdminData, phone: "invalid-phone" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("phone"))).toBe(true);
    });

    it("should return error for empty phone", () => {
      const invalidData = { ...validAdminData, phone: "" };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number cannot be empty.");
    });

    it("should return error for missing phone", () => {
      const invalidData = { ...validAdminData };
      delete (invalidData as Partial<interfaces.IAdminRegister>).phone;
      const result = adminRegisterValidator(invalidData as interfaces.IAdminRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number is required.");
    });
  });

  describe("Invalid password", () => {
    it("should return error for short password", () => {
      const invalidData = { 
        ...validAdminData, 
        password: "short"
      };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password should be at least 12 characters long.");
    });

    it("should return error for empty password", () => {
      const invalidData = { 
        ...validAdminData, 
        password: ""
      };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Please enter a password.");
    });

    it("should return error for missing password", () => {
      const invalidData = { ...validAdminData };
      delete (invalidData as Partial<interfaces.IAdminRegister>).password;
      const result = adminRegisterValidator(invalidData as interfaces.IAdminRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password is required.");
    });
  });

  describe("Optional type field", () => {
    it("should accept valid string type", () => {
      const dataWithType = { ...validAdminData, type: "admin" };
      const result = adminRegisterValidator(dataWithType);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.type).toBe("admin");
      }
    });

    it("should return error for non-string type", () => {
      const invalidData = { ...validAdminData, type: 123 as unknown as string };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Admin type should be a string");
    });
  });

  describe("Multiple validation errors", () => {
    it("should return multiple errors for multiple invalid fields", () => {
      const invalidData = {
        firstName: "",
        lastName: "Doe123",
        email: "invalid-email",
        phone: "",
        password: "short",
        type: 123 as unknown as string,
      };
      const result = adminRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.length).toBeGreaterThan(1);
      expect(result.errors).toContain("First name cannot be empty");
      expect(result.errors).toContain("Last name can only contain letters");
    });
  });
});
