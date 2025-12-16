/**
 * Customer Entity
 * 
 * Represents a customer in the e-commerce system.
 */

export class Customer {
  readonly id!: string;
  name!: string;
  email!: string;
  password!: string; // Hashed password
  address!: string;
  readonly createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(props: Partial<Customer>) {
    Object.assign(this, props);
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Customer name cannot be empty');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email address');
    }
    // Password validation could be more complex, but keeping it simple for domain entity
    if (!this.password || this.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
  }

  public updateProfile(name: string, address: string): void {
      this.name = name;
      this.address = address;
      this.updatedAt = new Date();
      this.validate();
  }

  // Getters
  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getEmail(): string { return this.email; }
  public getAddress(): string { return this.address; }
  public getCreatedAt(): Date { return this.createdAt; }
  public getUpdatedAt(): Date { return this.updatedAt; }
}
