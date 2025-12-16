/**
 * Product Repository Interface
 * 
 * This interface defines the contract for product persistence operations.
 * Following the Dependency Inversion Principle, the domain layer defines
 * the interface, but the implementation will be in the infrastructure layer.
 */

import { Product } from '@domain/entities/Product';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract findByCategory(categoryId: string): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
  abstract update(product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
  
  // Additional business-specific query methods
  abstract findBySku(sku: string): Promise<Product | null>;
  abstract findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
  abstract findOutOfStock(): Promise<Product[]>;
  abstract findLowStock(threshold: number): Promise<Product[]>;
}