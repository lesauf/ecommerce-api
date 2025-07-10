/**
 * Get Product Use Case
 * 
 * This use case is responsible for retrieving a product by its ID.
 * It demonstrates how application layer use cases orchestrate the flow of data
 * between the interfaces layer and the domain layer.
 */

import { Product } from '../../../domain/entities/Product';
import { ProductRepositoryInterface } from '../../../domain/repositories/ProductRepositoryInterface';

export interface GetProductUseCaseRequest {
  id: string;
}

export interface GetProductUseCaseResponse {
  product: Product | null;
}

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

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
