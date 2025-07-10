/**
 * ProductCategory Value Object
 * 
 * This is a domain value object that represents a product category.
 * Value objects are immutable and are identified by their attributes rather than an identity.
 */

export interface ProductCategoryProps {
  id: string;
  name: string;
  description?: string;
}

export class ProductCategory {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;

  constructor(props: ProductCategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description || '';

    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new Error('Category ID is required');
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Category name cannot be empty');
    }
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  // Value objects are compared based on their values, not identity
  public equals(category: ProductCategory): boolean {
    if (!(category instanceof ProductCategory)) {
      return false;
    }
    
    return this.id === category.id;
  }
}