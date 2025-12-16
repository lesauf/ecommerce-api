/**
 * Get Customer Use Case
 * 
 * Retrieves a customer by ID.
 */

import { injectable, inject } from 'tsyringe';
import { Customer } from '@domain/entities/Customer';
import { CustomerRepository } from '@domain/repositories/CustomerRepository';
import { CustomerRepositoryToken } from '@application/tokens';

@injectable()
export class GetCustomerUseCase {
  constructor(
    @inject(CustomerRepositoryToken) private customerRepository: CustomerRepository
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }
}
