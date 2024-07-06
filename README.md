# String Formatter

## Description

A collection of small utilities to help with converting and generating strings

## Usage

1. Add the package to your project:

```bash
deno add @eveffer/string-utils
```

2. Import a utility and use it:

```typescript
import { toSnakeCase } from "@eveffer/string-utils";

const snakeCaseString = toSnakeCase("HelloWorld");
console.log(snakeCaseString); // hello_world
```
