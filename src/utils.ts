/**
 * Effectively converts a string to snake case
 * 1. Removes non-alphanumeric characters from a string
 * 2. Strips leading and trailing whitespace and delimiters
 * 3. replaces delimiters [_, -, and space] with underscores
 * 4. replaces multiple underscores with a single underscore
 * 5. converts the string to lowercase
 * @param {string} inputString - input string
 * @returns {string} sanitized string
 */
function sanitizeString(inputString: string): string {
  // strip leading and trailing whitespace and delimiters
  inputString = inputString.trim().replace(/[^a-zA-Z0-9_]/g, "_");
  // replace spaces with underscores
  inputString = inputString.replace(" ", "_");
  // replace hyphens with underscores
  inputString = inputString.replace("-", "_");
  // replace multiple underscores with a single underscore
  inputString = inputString.replace(/_+/g, "_");
  // convert to lowercase
  inputString = inputString.toLowerCase();
  return inputString;
}

/**
 * Generates a random string of a given length
 * @param {number} length - length of the random string
 */
function generateRandomString(length: number = 24): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

/**
 * Adds leading zeros to a number or string
 * @param {number | string} value - value to add leading zeros to
 * @param {number} length - length of the resulting string (default is 2)
 */
function addLeadingZeros(value: number | string, length: number = 2): string {
  value = value.toString();
  if (value.length >= length) {
    return value;
  }
  return "0".repeat(length - value.length) + value;
}

export const utils = {
  sanitizeString,
  addLeadingZeros,
  generateRandomString,
};
