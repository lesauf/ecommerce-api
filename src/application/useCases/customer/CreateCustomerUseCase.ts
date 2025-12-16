/**
 * Create Customer Use Case
 * 
 * Orchestrates the creation of a new customer.
 */

import { injectable, inject } from 'tsyringe';
import { Customer } from '@domain/entities/Customer';
import { CustomerRepository } from '@domain/repositories/CustomerRepository';
import { CustomerRepositoryToken } from '@application/tokens';

export interface CreateCustomerRequest {
  name: string;
  email: string;
  address: string;
  password?: string; // Optional for now, could be improved
}

export interface CreateCustomerResponse {
  customer: Customer;
}

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(CustomerRepositoryToken) private customerRepository: CustomerRepository
  ) {}

  async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const existingCustomer = await this.customerRepository.findByEmail(request.email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }

    const customer = new Customer({
        id: Date.now().toString(), // Simple ID generation for now
        name: request.name,
        email: request.email,
        address: request.address,
        password: request.password || 'default_password', // Placeholder
        createdAt: new Date(),
        updatedAt: new Date()
    });

    await this.customerRepository.save(customer);

    return { customer };
  }
}
