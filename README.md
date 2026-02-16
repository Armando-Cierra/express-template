# Node.js Template

A minimal, modern Node.js template with TypeScript, ESM support, and development tooling pre-configured.

## Features

- **TypeScript** with strict type checking
- **ESM (ES Modules)** support
- **Path aliases** for cleaner imports (`@/*`)
- **Hot reload** development with tsx
- **Biome** for linting and formatting
- **Modern build system** with pkgroll
- **Git hooks** with Husky for automated code quality checks
- Node.js version management with `.nvmrc`

## Project Structure

```
├── .husky/             # Git hooks configuration
├── src/
│   └── app.ts          # Application entry point
├── dist/               # Compiled output (generated)
├── .nvmrc              # Node.js version specification
├── biome.json          # Biome configuration
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Prerequisites

- Node.js 24.x (use `nvm use` if you have nvm installed)
- A package manager (npm, pnpm, or yarn)

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
# or
pnpm build
# or
yarn build
```

### Production

Run the compiled application:

```bash
npm start
# or
pnpm start
# or
yarn start
```

### Type Checking

Validate TypeScript types without building:

```bash
npm run type-check
# or
pnpm type-check
# or
yarn type-check
```

## Configuration Details

### TypeScript Configuration

The template uses modern TypeScript settings optimized for Node.js:

- **Module System**: ESM with `module: "preserve"` and `moduleResolution: "bundler"`
- **Type Checking**: Strict mode enabled with additional safety checks
- **Path Mapping**: `@/*` aliases map to `src/*`
- **Build**: TypeScript validates types only; pkgroll handles compilation

### Package Configuration

Key `package.json` settings:

```json
"type": "module",
"source": "src/app.ts",
"exports": "./dist/app.js"
```

These settings ensure proper ESM support and define the entry point for the build process.

### Path Aliases

Import modules using the `@/` prefix instead of relative paths:

```typescript
// Instead of: import { something } from "../../utils/helper"
import { something } from "@/utils/helper"
```

### Git Hooks

The template includes Husky for automated code quality checks. A pre-commit hook is configured to run Biome formatting and linting before each commit:

- **Automatic formatting**: Code is automatically formatted using Biome
- **Lint checking**: Code is checked for potential issues
- **Package manager agnostic**: Uses `biome` directly without requiring a specific package manager

The pre-commit hook runs:
```bash
biome check --write
```

This ensures all committed code follows the project's formatting and linting standards.

## Editor Setup

### Biome Integration

Biome is configured for code formatting and linting. To enable editor integration:

#### VS Code

1. Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. Create `.vscode/settings.json` with the configuration below

#### Zed

1. Install the Biome extension
2. Create `.zed/settings.json` with the configuration below

#### Editor Configuration

Add this to your editor's settings file (`.vscode/settings.json` or `.zed/settings.json`):

```json
{
  "languages": {
    "Astro": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "CSS": { "formatter": { "language_server": { "name": "biome" } } },
    "GraphQL": { "formatter": { "language_server": { "name": "biome" } } },
    "HTML": { "formatter": { "language_server": { "name": "biome" } } },
    "JSON": { "formatter": { "language_server": { "name": "biome" } } },
    "JSONC": { "formatter": { "language_server": { "name": "biome" } } },
    "JSX": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "JavaScript": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "Svelte": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "TSX": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "TypeScript": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    },
    "Vue.js": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    }
  },
  "lsp": {
    "biome": {
      "settings": {
        "require_config_file": true
      }
    }
  }
}
```

## Manual Setup Guide

If you need to recreate this template from scratch or understand the configuration steps:

1. **Initialize the project:**
   ```bash
   npm init
   ```

2. **Install dependencies:**
   ```bash
   npm install -D @biomejs/biome @types/node pkgroll tsx typescript
   ```

3. **Configure `package.json`:**
   Add the following properties:
   ```json
   "type": "module",
   "source": "src/app.ts",
   "exports": "./dist/app.js"
   ```

4. **Generate TypeScript configuration:**
   ```bash
   npx tsc --init
   ```

5. **Update `tsconfig.json`:**
   Set these compiler options:
   ```json
   "module": "preserve",
   "moduleResolution": "bundler",
   "noEmit": true,
   "baseUrl": ".",
   "paths": {
     "@/*": ["src/*"]
   }
   ```

6. **Define npm scripts:**
   ```json
   "scripts": {
     "dev": "tsx --watch src/app.ts",
     "build": "pkgroll",
     "start": "node dist/app.js",
     "type-check": "tsc --noEmit"
   }
   ```

7. **Create `.nvmrc`:**
   ```
   24
   ```

8. **Set up Husky (optional):**
   ```bash
   npm install -D husky
   npx husky init
   ```
   
   Then create `.husky/pre-commit`:
   ```bash
   biome check --write
   ```

## License

ISC
