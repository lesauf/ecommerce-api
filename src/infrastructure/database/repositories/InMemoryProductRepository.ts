/**
 * In-Memory Product Repository Implementation
 * 
 * This class implements the ProductRepository interface from the domain layer.
 * It provides an in-memory implementation for development and testing purposes.
 * In a real application, this would be replaced with a database implementation.
 */

import { Product } from '@domain/entities/Product';
import { ProductRepositoryInterface } from '@domain/repositories/ProductRepositoryInterface';

export class InMemoryProductRepository implements ProductRepositoryInterface {
  private products: Map<string, Product> = new Map();

  async findById(id: string): Promise<Product | null> {
    const product = this.products.get(id);
    return product || null;
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.getCategory().getId() === categoryId
    );
  }

  async save(product: Product): Promise<void> {
    this.products.set(product.getId(), product);
  }

  async update(product: Product): Promise<void> {
    if (!this.products.has(product.getId())) {
      throw new Error(`Product with ID ${product.getId()} not found`);
    }
    this.products.set(product.getId(), product);
  }

  async delete(id: string): Promise<void> {
    this.products.delete(id);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = Array.from(this.products.values()).find(
      product => product.getSku() === sku
    );
    return product || null;
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.getPrice() >= minPrice && product.getPrice() <= maxPrice
    );
  }

  async findOutOfStock(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => !product.isInStock()
    );
  }

  async findLowStock(threshold: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.getStockQuantity() <= threshold && product.getStockQuantity() > 0
    );
  }
}
