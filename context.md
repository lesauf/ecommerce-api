# Project Context

## Overview
This is an E-commerce API built with Node.js, Express, and TypeScript, following Clean Architecture principles.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Dependency Injection**: tsyringe
- **Logging**: winston
- **Testing**: Jest

## Architecture
The project follows a Clean Architecture structure:

- **src/domain**: Contains business logic, entities. (Expected repositories interfaces here, but need confirmation).
- **src/application**: Contains use cases.
- **src/infrastructure**: Contains implementation details (database, external services).
- **src/interfaces**: Contains the entry points (HTTP controllers, routes).
- **src/config**: Configuration files.

## Path Aliases
The project uses path aliases defined in `tsconfig.json`:
- `@domain/*` -> `src/domain/*`
- `@application/*` -> `src/application/*`
- `@infrastructure/*` -> `src/infrastructure/*`
- `@interfaces/*` -> `src/interfaces/*`
- `@config/*` -> `src/config/*`

## Key Commands
- `npm run dev`: Start development server.
- `npm run build`: Build the project.
- `npm test`: Run tests.
