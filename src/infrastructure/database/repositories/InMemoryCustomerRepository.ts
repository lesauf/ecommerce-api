/**
 * In-Memory Customer Repository
 * 
 * In-memory implementation of CustomerRepository for development.
 */

import { injectable } from 'tsyringe';
import { Customer } from '@domain/entities/Customer';
import { CustomerRepository } from '@domain/repositories/CustomerRepository';

@injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Map<string, Customer> = new Map();

  async save(customer: Customer): Promise<void> {
    this.customers.set(customer.getId(), customer);
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.get(id) || null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = Array.from(this.customers.values()).find(
        c => c.getEmail() === email
    );
    return customer || null;
  }

  async update(customer: Customer): Promise<void> {
    if (!this.customers.has(customer.getId())) {
        throw new Error(`Customer with ID ${customer.getId()} not found`);
    }
    this.customers.set(customer.getId(), customer);
  }

  async delete(id: string): Promise<void> {
    this.customers.delete(id);
  }
}
