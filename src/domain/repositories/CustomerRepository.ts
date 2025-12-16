/**
 * Customer Repository Interface
 * 
 * Defines the contract for customer persistence operations.
 * Placed in Domain layer to adhere to Clean Architecture.
 */

import { Customer } from '../entities/Customer';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  update(customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;
}
