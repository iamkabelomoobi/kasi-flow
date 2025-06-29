import crypto from 'crypto';

/**
 * Securely compares two strings in a timing-safe manner to prevent timing attacks
 *
 * @param str1 - The first string to compare
 * @param str2 - The second string to compare
 * @param options - Optional configuration options
 * @returns boolean indicating if the strings are equal
 */
export const stringValidator = (
  str1: string | null | undefined,
  str2: string | null | undefined,
  options: { trimWhitespace?: boolean } = { trimWhitespace: true }
): boolean => {
  try {
    const safeStr1 = str1 === null || str1 === undefined ? '' : String(str1);
    const safeStr2 = str2 === null || str2 === undefined ? '' : String(str2);

    const processedStr1 =
      options.trimWhitespace !== false ? safeStr1.trim() : safeStr1;
    const processedStr2 =
      options.trimWhitespace !== false ? safeStr2.trim() : safeStr2;

    if (processedStr1.length !== processedStr2.length) {
      return false;
    }

    const buffer1: Buffer = Buffer.from(processedStr1, 'utf8');
    const buffer2: Buffer = Buffer.from(processedStr2, 'utf8');

    return crypto.timingSafeEqual(
      new Uint8Array(buffer1),
      new Uint8Array(buffer2)
    );
  } catch (error) {
    console.error('Error in stringValidator:', error);
    return false;
  }
};
