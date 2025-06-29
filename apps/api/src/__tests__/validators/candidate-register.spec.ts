import { candidateRegisterValidator } from "../../validators";
import { interfaces } from "@kasi-flow/shared";

describe("candidateRegisterValidator", () => {
  const validCandidateData: interfaces.ICandidateRegister = {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    password: "ValidPassword123!",
    type: "junior",
    skills: ["JavaScript", "TypeScript", "React"],
  };

  describe("Valid data", () => {
    it("should return valid result for complete candidate data", () => {
      const result = candidateRegisterValidator(validCandidateData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeDefined();
      if (result.data) {
        expect(result.data.firstName).toBe("Jane");
        expect(result.data.lastName).toBe("Smith");
        expect(result.data.email).toBe("jane.smith@example.com");
        expect(result.data.skills).toEqual(["JavaScript", "TypeScript", "React"]);
      }
    });

    it("should return valid result without optional fields", () => {
      const dataWithoutOptionals = {
        firstName: "Jane",
        lastName: "Smith", 
        email: "jane.smith@example.com",
        phone: "+1987654321",
        password: "ValidPassword123!",
      };
      
      const result = candidateRegisterValidator(dataWithoutOptionals);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.data).toBeDefined();
    });

    it("should accept empty skills array", () => {
      const dataWithEmptySkills = { ...validCandidateData, skills: [] };
      const result = candidateRegisterValidator(dataWithEmptySkills);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
      if (result.data) {
        expect(result.data.skills).toEqual([]);
      }
    });
  });

  describe("Invalid firstName", () => {
    it("should return error for empty firstName", () => {
      const invalidData = { ...validCandidateData, firstName: "" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name cannot be empty");
    });

    it("should return error for firstName with numbers", () => {
      const invalidData = { ...validCandidateData, firstName: "Jane123" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name can only contain letters");
    });

    it("should return error for firstName with special characters", () => {
      const invalidData = { ...validCandidateData, firstName: "Jane@" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("First name can only contain letters");
    });

    it("should return error for missing firstName", () => {
      const invalidData = { ...validCandidateData };
      delete (invalidData as Partial<interfaces.ICandidateRegister>).firstName;
      const result = candidateRegisterValidator(invalidData as interfaces.ICandidateRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("\"firstName\" is required");
    });
  });

  describe("Invalid lastName", () => {
    it("should return error for empty lastName", () => {
      const invalidData = { ...validCandidateData, lastName: "" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Last name cannot be empty");
    });

    it("should return error for lastName with numbers", () => {
      const invalidData = { ...validCandidateData, lastName: "Smith123" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Last name can only contain letters");
    });

    it("should return error for missing lastName", () => {
      const invalidData = { ...validCandidateData };
      delete (invalidData as Partial<interfaces.ICandidateRegister>).lastName;
      const result = candidateRegisterValidator(invalidData as interfaces.ICandidateRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("\"lastName\" is required");
    });
  });

  describe("Invalid email", () => {
    it("should return error for invalid email format", () => {
      const invalidData = { ...validCandidateData, email: "invalid-email" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("email"))).toBe(true);
    });

    it("should return error for empty email", () => {
      const invalidData = { ...validCandidateData, email: "" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email cannot be just spaces or empty.");
    });

    it("should return error for missing email", () => {
      const invalidData = { ...validCandidateData };
      delete (invalidData as Partial<interfaces.ICandidateRegister>).email;
      const result = candidateRegisterValidator(invalidData as interfaces.ICandidateRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Email is required and cannot be empty.");
    });
  });

  describe("Invalid phone", () => {
    it("should return error for invalid phone format", () => {
      const invalidData = { ...validCandidateData, phone: "invalid-phone" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(error => error.includes("phone"))).toBe(true);
    });

    it("should return error for empty phone", () => {
      const invalidData = { ...validCandidateData, phone: "" };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number cannot be empty.");
    });

    it("should return error for missing phone", () => {
      const invalidData = { ...validCandidateData };
      delete (invalidData as Partial<interfaces.ICandidateRegister>).phone;
      const result = candidateRegisterValidator(invalidData as interfaces.ICandidateRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Phone number is required.");
    });
  });

  describe("Invalid password", () => {
    it("should return error for short password", () => {
      const invalidData = { 
        ...validCandidateData, 
        password: "short"
      };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password should be at least 12 characters long.");
    });

    it("should return error for empty password", () => {
      const invalidData = { 
        ...validCandidateData, 
        password: ""
      };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Please enter a password.");
    });

    it("should return error for missing password", () => {
      const invalidData = { ...validCandidateData };
      delete (invalidData as Partial<interfaces.ICandidateRegister>).password;
      const result = candidateRegisterValidator(invalidData as interfaces.ICandidateRegister);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Password is required.");
    });
  });

  describe("Optional type field", () => {
    it("should accept valid string type", () => {
      const dataWithType = { ...validCandidateData, type: "senior" };
      const result = candidateRegisterValidator(dataWithType);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.type).toBe("senior");
      }
    });

    it("should return error for non-string type", () => {
      const invalidData = { ...validCandidateData, type: 123 as unknown as string };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Type must be a string");
    });
  });

  describe("Optional skills field", () => {
    it("should accept valid skills array", () => {
      const dataWithSkills = { 
        ...validCandidateData, 
        skills: ["Python", "Django", "PostgreSQL"] 
      };
      const result = candidateRegisterValidator(dataWithSkills);
      
      expect(result.isValid).toBe(true);
      if (result.data) {
        expect(result.data.skills).toEqual(["Python", "Django", "PostgreSQL"]);
      }
    });

    it("should return error for non-array skills", () => {
      const invalidData = { 
        ...validCandidateData, 
        skills: "JavaScript" as unknown as string[] 
      };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("Skills must be an array of strings");
    });

    it("should return error for skills array with non-string items", () => {
      const invalidData = { 
        ...validCandidateData, 
        skills: ["JavaScript", 123, "React"] as unknown as string[]
      };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain("\"skills[1]\" must be a string");
    });
  });

  describe("Multiple validation errors", () => {
    it("should return multiple errors for multiple invalid fields", () => {
      const invalidData = {
        firstName: "",
        lastName: "Smith123",
        email: "invalid-email",
        phone: "",
        password: "short",
        type: 123 as unknown as string,
        skills: "not-array" as unknown as string[],
      };
      const result = candidateRegisterValidator(invalidData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.length).toBeGreaterThan(1);
      expect(result.errors).toContain("First name cannot be empty");
      expect(result.errors).toContain("Last name can only contain letters");
      expect(result.errors).toContain("Skills must be an array of strings");
    });
  });
});
