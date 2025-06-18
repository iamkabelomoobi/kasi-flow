/**
 * Custom error for JWT key not found
 */
class JwtKeyNotFoundError extends Error {
  constructor(role: string, type: string) {
    super(`JWT key not found for role '${role}' and type '${type}'`);
    this.name = "JwtKeyNotFoundError";
    Object.setPrototypeOf(this, JwtKeyNotFoundError.prototype);
  }
}

/**
 * Custom error for JWT token type mismatch
 */
class JwtTokenTypeMismatchError extends Error {
  constructor(expected?: string, actual?: string) {
    super(
      `JWT token type mismatch${
        expected && actual ? `: expected '${expected}', got '${actual}'` : ""
      }`
    );
    this.name = "JwtTokenTypeMismatchError";
    Object.setPrototypeOf(this, JwtTokenTypeMismatchError.prototype);
  }
}

/**
 * Custom error for invalid JWT tokens
 */
class InvalidJwtTokenError extends Error {
  constructor(message = "Invalid JWT token") {
    super(message);
    this.name = "InvalidJwtTokenError";
    Object.setPrototypeOf(this, InvalidJwtTokenError.prototype);
  }
}

export { JwtKeyNotFoundError, JwtTokenTypeMismatchError, InvalidJwtTokenError };
