# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**pyx** - Python execution for Cloudflare Workers using Pyodide (WebAssembly Python). Enables scientific computing, data analysis, and ML inference at the edge with ~1s cold starts and memory snapshots.

```typescript
import { py } from 'pyx'

const result = await py.exec(`
  import numpy as np
  arr = np.array([1, 2, 3, 4, 5])
  np.mean(arr)
`)
console.log(result.result) // 3.0
```

## Architecture

The codebase has two main layers:

### `core/` - Platform-Agnostic Core Library (`@dotdo/pyx`)

The core module provides utilities that work in any JavaScript runtime (Node.js, Deno, Bun, browsers, Workers). No Cloudflare dependencies.

| Module | Purpose |
|--------|---------|
| `ast/` | Python AST parser and visitor utilities (`parse`, `walk`, `ASTVisitor`, `ASTTransformer`) |
| `safety/` | Code safety analyzer - detects dangerous imports, code execution, filesystem/network access, infinite loops |
| `transform/` | Code transformations for Pyodide - async wrapping, import rewriting, output capture, exception handling |
| `packages/` | Python package manifest parsing - pyproject.toml, requirements.txt, setup.py/cfg |
| `venv/` | Virtual environment abstraction for managing packages in Pyodide environments |
| `backend.ts` | `PythonBackend` interface and `MockBackend` for testing |
| `types.ts` | Core type definitions (`PythonVersion`, `ExecutionResult`, `PackageSpec`, etc.) |

### Root `index.ts` - Main API

High-level API for Python execution with sessions, snapshots, and notebooks. Uses the core utilities internally.

## Key Modules

### AST Parser (`core/ast/`)
Full Python AST parser in TypeScript. Exports `parse()`, `parseExpression()`, and visitor utilities (`walk`, `getNodesOfType`, `findNode`, `findNodes`, `ASTVisitor`, `ASTTransformer`).

### Safety Analyzer (`core/safety/`)
Analyzes Python code for potentially dangerous operations:
- Dangerous imports (os, subprocess, socket, etc.)
- Code execution (exec, eval, compile)
- Filesystem/network access
- Serialization dangers (pickle)
- FFI/ctypes usage
- Infinite loops and resource exhaustion

### Transform Utilities (`core/transform/`)
Code transformations for Pyodide compatibility:
- `wrapAsync()` / `wrapTopLevelAwait()` - async code handling
- `rewriteImports()` - import statement transformation
- `capturePrint()` / `extractReturnValue()` - output capture
- `mockInput()` - input() function mocking
- `wrapExceptions()` - exception handling

### Package Parsing (`core/packages/`)
Parses Python package manifests:
- `parsePyprojectToml()` - PEP 517/518/621 format
- `parseRequirementsTxt()` - requirements.txt format
- `extractPackageMetadata()` - auto-detects format
- Version specifier parsing and comparison

### Virtual Environment (`core/venv/`)
`VirtualEnv` class for managing packages:
- Install/uninstall with dependency resolution
- Pyodide compatibility checking
- Wheel file compatibility validation
- Import/export state (JSON or requirements.txt)

## Commands

```bash
npm run build       # TypeScript compilation
npm test            # Vitest watch mode
npm run test:run    # Tests once
npm run typecheck   # TypeScript check (no emit)
npm run dev         # Wrangler dev server
npm run deploy      # Build + deploy to CF Workers
```

### Running Specific Tests

```bash
npx vitest run test/core/ast/           # AST tests
npx vitest run test/core/safety/        # Safety tests
npx vitest run test/core/transform/     # Transform tests
npx vitest run test/core/packages/      # Package parsing tests
npx vitest run test/core/venv/          # Virtual env tests
npx vitest run test/core/backend.test.ts # Backend interface tests
```

## Key Types

```typescript
// Python execution result
interface PyExecResult {
  result: unknown    // Return value of last expression
  stdout: string     // Captured stdout
  stderr: string     // Captured stderr
  duration: number   // Execution time in ms
}

// Backend interface (implemented by Pyodide, Mock, etc.)
interface PythonBackend {
  exec(code: string, options?: ExecOptions): Promise<ExecResult>
  importModule(name: string): Promise<PyModule>
  installPackage(name: string, version?: string): Promise<void>
  createSnapshot(): Promise<Uint8Array>
  restoreSnapshot(data: Uint8Array): Promise<void>
  reset(): Promise<void>
}

// Safety analysis result
interface SafetyReport {
  safe: boolean
  violations: SafetyViolation[]
}
```

## File Structure

```
pyx/
  index.ts           # Main API (py.exec, py.session, notebooks)
  core/
    index.ts         # Core module exports
    backend.ts       # PythonBackend interface + MockBackend
    types.ts         # Core type definitions
    ast/
      index.ts       # AST exports
      parser.ts      # Python parser (~70KB)
      types.ts       # AST node types
      visitor.ts     # Visitor utilities
    safety/
      index.ts       # Safety exports
      analyzer.ts    # Main analyzer
      rules.ts       # Safety rules
      types.ts       # Violation types
    transform/
      index.ts       # Transform exports
      async.ts       # Async wrapping
      capture.ts     # Output capture
      exceptions.ts  # Exception handling
      imports.ts     # Import rewriting
      input.ts       # Input mocking
    packages/
      index.ts       # Package parsing exports
      pyproject.ts   # pyproject.toml parser
      requirements.ts # requirements.txt parser
      specifiers.ts  # Version specifier utils
      types.ts       # Package types
    venv/
      index.ts       # VirtualEnv class
      compatibility.ts # Pyodide compatibility data
      types.ts       # Venv types
  test/
    core/            # Core module tests
```

## Issue Tracking (bd)

This project uses **bd** (beads) for issue tracking:

```bash
bd ready                              # Find available work
bd show <id>                          # View issue details
bd update <id> --status in_progress   # Claim work
bd close <id>                         # Complete work
bd sync                               # Sync with git
```

## Development Notes

- The `core/` module has zero Cloudflare dependencies - keep it runtime-agnostic
- The AST parser is large (~70KB) but necessary for safety analysis and transforms
- `MockBackend` is useful for testing without actual Pyodide
- Safety rules can be extended in `core/safety/rules.ts`
- Pyodide compatibility data is in `core/venv/compatibility.ts`
