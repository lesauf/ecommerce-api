/**
 * Get Product Use Case
 * 
 * This use case is responsible for retrieving a product by its ID.
 * It demonstrates how application layer use cases orchestrate the flow of data
 * between the interfaces layer and the domain layer.
 */

import { Product } from '@domain/entities/Product';
import { injectable, inject } from 'tsyringe';
import { ProductRepositoryToken } from '@application/tokens';
import { ProductRepository } from '@domain/repositories/ProductRepository';

export interface GetProductUseCaseRequest {
  id: string;
}

export interface GetProductUseCaseResponse {
  product: Product | null;
}

@injectable()
export class GetProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(
    @inject(ProductRepositoryToken) productRepository: ProductRepository
  ) {
    this.productRepository = productRepository;
  }

  async execute(request: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const { id } = request;

    // Input validation
    if (!id) {
      throw new Error('Product ID is required');
    }

    // Use the repository to fetch the product
    const product = await this.productRepository.findById(id);

    // Return the response
    return {
      product
    };
  }
}
