/**
 * Dependency Injection Container Configuration
 * 
 * This file configures the Tsyringe dependency injection container.
 * It registers all the dependencies that will be injected throughout the application.
 */

import { container } from 'tsyringe';
import { ProductRepositoryInterface } from '@domain/repositories/ProductRepositoryInterface';
import { InMemoryProductRepository } from '@infrastructure/database/repositories/InMemoryProductRepository';

// Register repositories
container.registerSingleton<ProductRepositoryInterface>(
  'ProductRepositoryInterface',
  InMemoryProductRepository
);

export { container };