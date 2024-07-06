import { utils } from "./utils.ts";

/**
 * Converts a string from camel case to snake case
 * e.g. "helloWorld" -> "hello_world"
 * Also works for Pascal case
 * e.g. "HelloWorld" -> "hello_world"
 * @param {string} inputString - input string
 * @returns {string} snake case string
 */
function camelToSnakeCase(inputString: string): string {
  // strip leading and trailing whitespace and delimiters
  inputString = inputString.trim().replace(/[^a-zA-Z0-9_]/g, "_");
  // substitute capital letters with underscore and lowercase
  inputString = inputString.replace(/(?<!^)(?=[A-Z])/g, "_").toLowerCase();
  return utils.sanitizeString(inputString);
}

/**
 * Converts a string to camel case
 * e.g. "hello_world" -> "helloWorld"
 * e.g. "hello-world" -> "helloWorld"
 * e.g. "hello world" -> "helloWorld"
 * e.g. "hello   world" -> "helloWorld"
 * @param {string} inputString - input string
 * @returns {string} camel case string
 */
function toCamelCase(inputString: string): string {
  inputString = utils.sanitizeString(inputString);
  // split the string into words
  const words = inputString.split("_");
  // if there is only one word, return the input string
  if (words.length === 1) {
    return inputString;
  }
  // capitalize the first letter of each word except the first word
  return words[0] +
    words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
}

/**
 * Converts a string to pascal case
 * e.g. "hello_world " -> "HelloWorld"
 * e.g. "hello-world" -> "HelloWorld"
 * e.g. "hello world" -> "HelloWorld"
 * e.g. "hello   world" -> "HelloWorld"
 * @param {string} inputString - input string
 * @returns {string} pascal case string
 */
function toPascalCase(inputString: string): string {
  inputString = utils.sanitizeString(inputString);
  // split the string into words
  const words = inputString.split("_");
  // capitalize the first letter of each word
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(
    "",
  );
}

/**
 * Converts a string to snake case
 * e.g. "HelloWorld" -> "hello_world"
 * e.g. "hello-world" -> "hello_world"
 * e.g. "hello world" -> "hello_world"
 * e.g. "hello   world" -> "hello_world"
 * @param {string} inputString - input string
 * @returns {string} snake case string
 */
function toSnakeCase(inputString: string): string {
  return utils.sanitizeString(inputString);
}

/**
 * Converts a string to title case
 * @param {string} inputString
 */
function toTitleCase(inputString: string): string {
  inputString = utils.sanitizeString(inputString);
  inputString = inputString.replace("_", " ");
  return inputString.split(" ").map((word) =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
}

/**
 * Converts a camel case string to title case
 * @param {string} inputString
 */
function camelToTitleCase(inputString: string): string {
  return toTitleCase(camelToSnakeCase(inputString));
}

export const convert = {
  camelToTitleCase,
  camelToSnakeCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
};
