# String Conversion Utilities

This module provides various utility functions to convert strings between
different cases such as camel case, snake case, pascal case, and title case.

[`camelToSnakeCase`](#camelToSnakeCase)

[`toCamelCase`](#toCamelCase)

[`toPascalCase`](#toPascalCase)

[`toSnakeCase`](#toSnakeCase)

[`toTitleCase`](#toTitleCase)

[`camelToTitleCase`](#camelToTitleCase)

## `camelToSnakeCase`

Converts a string from camel case to snake case. Also works for Pascal case.

```typescript
camelToSnakeCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string in camel case or Pascal case.

**Returns:**

- (string): The converted string in snake case.

**Examples:**

```typescript
camelToSnakeCase("helloWorld"); // "hello_world"
camelToSnakeCase("HelloWorld"); // "hello_world"
```

## `toCamelCase`

Converts a string to camel case.

```typescript
toCamelCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string.

**Returns:**

- (string): The converted string in camel case.

**Examples:**

```typescript
toCamelCase("hello_world"); // "helloWorld"
toCamelCase("hello-world"); // "helloWorld"
toCamelCase("hello world"); // "helloWorld"
toCamelCase("hello   world"); // "helloWorld"
```

## `toPascalCase`

Converts a string to pascal case.

```typescript
toPascalCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string.

**Returns:**

- (string): The converted string in pascal case.

**Examples:**

```typescript
toPascalCase("hello_world"); // "HelloWorld"
toPascalCase("hello-world"); // "HelloWorld"
toPascalCase("hello world"); // "HelloWorld"
toPascalCase("hello   world"); // "HelloWorld"
```

## `toSnakeCase`

Converts a string to snake case.

```typescript
toSnakeCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string.

**Returns:**

- (string): The converted string in snake case.

**Examples:**

```typescript
toSnakeCase("HelloWorld"); // "hello_world"
toSnakeCase("hello-world"); // "hello_world"
toSnakeCase("hello world"); // "hello_world"
toSnakeCase("hello   world"); // "hello_world"
```

## `toTitleCase`

Converts a string to title case.

```typescript
toTitleCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string.

**Returns:**

- (string): The converted string in title case.

**Examples:**

```typescript
toTitleCase("hello_world"); // "Hello World"
```

## `camelToTitleCase`

Converts a camel case string to title case.

```typescript
camelToTitleCase(inputString: string): string
```

**Parameters:**

- `inputString` (string): The input string in camel case.

**Returns:**

- (string): The converted string in title case.

**Examples:**

```typescript
camelToTitleCase("helloWorld"); // "Hello World"
```

# Other Utilities

These are random useful utilities

[`sanitizeString`](#sanitizeString)

[`generateRandomString`](#generateRandomString)

[`addLeadingZeros`](#addLeadingZeros)

## `sanitizeString`

Effectively converts a string to snake case.

1. Removes non-alphanumeric characters from a string.
2. Strips leading and trailing whitespace and delimiters.
3. Replaces delimiters (`_`, `-`, and space) with underscores.
4. Replaces multiple underscores with a single underscore.
5. Converts the string to lowercase.

#### Parameters

- `inputString` (`string`): The input string.

#### Returns

- `string`: The sanitized string.

#### Example

```typescript
import { sanitizeString } from "./utils";

const result = sanitizeString("Hello World!");
console.log(result); // Output: hello_world
```

## `generateRandomString`

Generates a random string of a given length.

#### Parameters

- `length` (`number`, optional): The length of the random string. Default is
  `24`.

#### Returns

- `string`: The generated random string.

#### Example

```typescript
import { generateRandomString } from "./utils";

const randomString = generateRandomString(16);
console.log(randomString); // Output: A random string of 16 characters
```

## `addLeadingZeros`

Adds leading zeros to a number or string.

#### Parameters

- `value` (`number | string`): The value to add leading zeros to.
- `length` (`number`, optional): The length of the resulting string. Default is
  `2`.

#### Returns

- `string`: The value with leading zeros.

#### Example

```typescript
import { addLeadingZeros } from "./utils";

const paddedNumber = addLeadingZeros(5, 4);
console.log(paddedNumber); // Output: 0005
```
