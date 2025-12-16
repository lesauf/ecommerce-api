# E-Commerce API

A RESTful API for an e-commerce platform built with Node.js, Express, and TypeScript following clean architecture principles.

## Project Overview

This project is a demonstration of how to build a scalable and maintainable e-commerce API using clean architecture principles. It showcases:

- Clean Architecture implementation in TypeScript
- Domain-Driven Design (DDD) principles
- RESTful API design with Express
- Type safety with TypeScript
- Testing with Jest

## Clean Architecture

This project follows the clean architecture principles, which separates the code into layers with clear dependencies:

Domain ← Application ← Interfaces ← Infrastructure

### Layers

1. **Domain Layer** (`src/domain/`)
   - Contains enterprise business rules
   - Entities, value objects, and repository interfaces
   - No dependencies on other layers or frameworks

2. **Application Layer** (`src/application/`)
   - Contains application-specific business rules
   - Use cases that orchestrate the flow of data and entities
   - Depends only on the domain layer

3. **Interfaces Layer** (`src/interfaces/`)
   - Contains adapters that convert data from the format most convenient for use cases and entities to the format most convenient for external agencies
   - Controllers, presenters, and middleware
   - Depends on the application layer

4. **Infrastructure Layer** (`src/infrastructure/`)
   - Contains frameworks, drivers, and tools
   - Database implementations, web frameworks, external services
   - Depends on the interfaces layer

### Dependency Rule

The fundamental rule of clean architecture is that dependencies can only point inward. Inner layers should not know anything about outer layers.

## Project Structure

```
src/
├── domain/                 # Enterprise business rules
│   ├── entities/           # Business entities
│   ├── repositories/       # Repository interfaces
│   └── valueObjects/       # Value objects
│
├── application/            # Application business rules
│   ├── interfaces/         # Ports for the interfaces layer
│   └── useCases/           # Application use cases
│
├── interfaces/             # Interface adapters
│   ├── controllers/        # Controllers
│   ├── middlewares/        # HTTP middlewares
│   └── presenters/         # Presenters for formatting responses
│
├── infrastructure/         # Frameworks and drivers
│   ├── database/           # Database implementations
│   ├── http/               # HTTP server and routes
│   └── services/           # External services
│
└── config/                 # Application configuration
```

## Automatic Repository Discovery
This project auto-discovers repository implementations to avoid manual updates to providers.ts and tokens.ts.

How it works:
- Place implementations under src/infrastructure/database/repositories.
- Each class should be @injectable() and declare a static ENGINE identifying the backend: e.g., static ENGINE = 'memory' | 'mongo' | 'maria'.
- The container scans that folder at startup, registers each implementation under a per-engine token (Symbol.for(`ProductRepository:<engine>`)), and aliases the interface token to the selected engine based on DB_ENGINE.
- Use cases keep injecting ProductRepositoryToken (stable).

Switch engine:
- Set environment variable DB_ENGINE=memory | mongo | maria. If the requested engine is not discovered, the container falls back to memory.

Example implementation:

```ts\n@injectable()
export class InMemoryProductRepository implements ProductRepositoryInterface {
  static ENGINE = 'memory';
  // ...
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
4. Build the project:
   ```
   npm run build
   ```
5. Start the server:
   ```
   npm start
   ```

### Development

```
npm run dev
```

### Testing

```
npm test
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Benefits of This Architecture

1. **Testability**: Business rules can be tested without UI, database, web server, or any external element.
2. **Independence of frameworks**: The architecture doesn't depend on the existence of some library or framework.
3. **Independence of UI**: The UI can change easily, without changing the rest of the system.
4. **Independence of database**: You can swap out databases without affecting business rules.
5. **Independence of any external agency**: Business rules don't know anything about the outside world.

## License

MIT