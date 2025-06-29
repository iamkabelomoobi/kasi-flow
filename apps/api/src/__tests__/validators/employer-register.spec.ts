import { employerRegisterValidator } from "../../validators";
import { interfaces } from "@kasi-flow/shared";

describe("employerRegisterValidator", () => {
  const validEmployerData: interfaces.IEmployerRegister = {
    name: "Tech Corp Inc",
    industry: "Technology",
    size: 250,
    email: "hr@techcorp.com",
    phone: "+1555123456",
    password: "ValidPassword123!",
  };

  describe("Valid data", () => {
    it("should return valid result for complete employer data", () => {
      const result = employerRegisterValidator(validEmployerData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.name).toBe("Tech Corp Inc");
        expect(result.data.industry).toBe("Technology");
        expect(result.data.size).toBe(250);
        expect(result.data.email).toBe("hr@techcorp.com");
      }
    });

    it("should accept different company sizes", () => {
      const smallCompany = { ...validEmployerData, size: 1 };
      const result = employerRegisterValidator(smallCompany);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.size).toBe(1);
      }
    });

    it("should accept large company sizes", () => {
      const largeCompany = { ...validEmployerData, size: 10000 };
      const result = employerRegisterValidator(largeCompany);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.size).toBe(10000);
      }
    });
  });

  describe("Invalid name", () => {
    it("should return error for empty name", () => {
      const invalidData = { ...validEmployerData, name: "" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Name cannot be empty");
    });

    it("should return error for missing name", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).name;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Name is required");
    });

    it("should return error for non-string name", () => {
      const invalidData = { ...validEmployerData, name: 123 as unknown as string };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Name must be a string");
    });
  });

  describe("Invalid industry", () => {
    it("should return error for empty industry", () => {
      const invalidData = { ...validEmployerData, industry: "" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Industry cannot be empty");
    });

    it("should return error for missing industry", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).industry;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Industry is required");
    });

    it("should return error for non-string industry", () => {
      const invalidData = { ...validEmployerData, industry: 123 as unknown as string };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Industry must be a string");
    });
  });

  describe("Invalid size", () => {
    it("should return error for missing size", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).size;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Size is required");
    });

    it("should return error for non-number size", () => {
      const invalidData = { ...validEmployerData, size: "250" as unknown as number };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Size must be a number");
    });

    it("should return error for negative size", () => {
      const invalidData = { ...validEmployerData, size: -10 };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Size must be at least 1");
    });

    it("should return error for zero size", () => {
      const invalidData = { ...validEmployerData, size: 0 };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Size must be at least 1");
    });
  });

  describe("Invalid email", () => {
    it("should return error for invalid email format", () => {
      const invalidData = { ...validEmployerData, email: "invalid-email" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("email"))).toBe(true);
    });

    it("should return error for empty email", () => {
      const invalidData = { ...validEmployerData, email: "" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email cannot be just spaces or empty.");
    });

    it("should return error for missing email", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).email;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email is required and cannot be empty.");
    });
  });

  describe("Invalid phone", () => {
    it("should return error for invalid phone format", () => {
      const invalidData = { ...validEmployerData, phone: "invalid-phone" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("phone"))).toBe(true);
    });

    it("should return error for empty phone", () => {
      const invalidData = { ...validEmployerData, phone: "" };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number cannot be empty.");
    });

    it("should return error for missing phone", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).phone;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number is required.");
    });
  });

  describe("Invalid password", () => {
    it("should return error for short password", () => {
      const invalidData = { 
        ...validEmployerData, 
        password: "short"
      };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password should be at least 12 characters long.");
    });

    it("should return error for empty password", () => {
      const invalidData = { 
        ...validEmployerData, 
        password: ""
      };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Please enter a password.");
    });

    it("should return error for missing password", () => {
      const invalidData = { ...validEmployerData };
      delete (invalidData as Partial<interfaces.IEmployerRegister>).password;
      const result = employerRegisterValidator(invalidData as interfaces.IEmployerRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password is required.");
    });
  });

  describe("Edge cases", () => {
    it("should handle company name with special characters", () => {
      const dataWithSpecialChars = { 
        ...validEmployerData, 
        name: "Tech & Co. Ltd." 
      };
      const result = employerRegisterValidator(dataWithSpecialChars);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.name).toBe("Tech & Co. Ltd.");
      }
    });

    it("should handle industry with special characters", () => {
      const dataWithSpecialIndustry = { 
        ...validEmployerData, 
        industry: "IT & Software Development" 
      };
      const result = employerRegisterValidator(dataWithSpecialIndustry);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.industry).toBe("IT & Software Development");
      }
    });

    it("should handle very large company size", () => {
      const dataWithLargeSize = { 
        ...validEmployerData, 
        size: 1000000 
      };
      const result = employerRegisterValidator(dataWithLargeSize);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.size).toBe(1000000);
      }
    });
  });

  describe("Multiple validation errors", () => {
    it("should return multiple errors for multiple invalid fields", () => {
      const invalidData = {
        name: "",
        industry: "",
        size: "invalid" as unknown as number,
        email: "invalid-email",
        phone: "",
        password: "short",
      };
      const result = employerRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.length).toBeGreaterThan(1);
      expect(result.errors).toContain("Name cannot be empty");
      expect(result.errors).toContain("Industry cannot be empty");
      expect(result.errors).toContain("Size must be a number");
    });
  });
});
