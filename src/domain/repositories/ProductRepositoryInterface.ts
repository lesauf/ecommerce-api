/**
 * Product Repository Interface
 * 
 * This interface defines the contract for product persistence operations.
 * Following the Dependency Inversion Principle, the domain layer defines
 * the interface, but the implementation will be in the infrastructure layer.
 */

import { Product } from '../entities/Product';

export interface ProductRepositoryInterface {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByCategory(categoryId: string): Promise<Product[]>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  
  // Additional business-specific query methods
  findBySku(sku: string): Promise<Product | null>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
  findOutOfStock(): Promise<Product[]>;
  findLowStock(threshold: number): Promise<Product[]>;
}