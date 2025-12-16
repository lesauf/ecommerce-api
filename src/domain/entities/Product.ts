/**
 * Product Entity
 * 
 * This is a core domain entity that represents a product in the e-commerce system.
 * It contains only the business logic and rules that are specific to products.
 */

import { ProductCategory } from './ProductCategory';

export class Product {
  readonly id!: string;
  name!: string;
  description!: string;
  price!: number;
  category!: ProductCategory;
  sku!: string;
  stockQuantity!: number;
  readonly createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(props: Partial<Product>) {
    Object.assign(this, props);
    
    this.validate();
  }

  // Business rule: Product name must not be empty
  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }

    if (this.price < 0) {
      throw new Error('Product price cannot be negative');
    }

    if (this.stockQuantity < 0) {
      throw new Error('Product stock quantity cannot be negative');
    }
  }

  // Business method: Check if product is in stock
  public isInStock(): boolean {
    return this.stockQuantity > 0;
  }

  // Business method: Decrease stock quantity
  public decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    
    if (this.stockQuantity < quantity) {
      throw new Error('Insufficient stock');
    }
    
    this.stockQuantity -= quantity;
    this.updatedAt = new Date();
  }

  // Business method: Increase stock quantity
  public increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    
    this.stockQuantity += quantity;
    this.updatedAt = new Date();
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCategory(): ProductCategory {
    return this.category;
  }

  public getSku(): string {
    return this.sku;
  }

  public getStockQuantity(): number {
    return this.stockQuantity;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Setters with validation
  public updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }
    this.name = name;
    this.updatedAt = new Date();
  }

  public updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  public updatePrice(price: number): void {
    if (price < 0) {
      throw new Error('Product price cannot be negative');
    }
    this.price = price;
    this.updatedAt = new Date();
  }

  public updateCategory(category: ProductCategory): void {
    this.category = category;
    this.updatedAt = new Date();
  }

  // Helper method to generate a unique ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}