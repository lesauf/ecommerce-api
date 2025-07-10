/**
 * Product Presenter
 * 
 * This class is responsible for presenting a product entity
 * to the client in a suitable format.
 */

import { Product } from '../../domain/entities/Product';

export class ProductPresenter {
  present(product: Product): any {
    return {
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      category: {
        id: product.getCategory().getId(),
        name: product.getCategory().getName(),
        description: product.getCategory().getDescription()
      },
      sku: product.getSku(),
      stockQuantity: product.getStockQuantity(),
      inStock: product.isInStock(),
      createdAt: product.getCreatedAt().toISOString(),
      updatedAt: product.getUpdatedAt().toISOString()
    };
  }

  presentMany(products: Product[]): any[] {
    return products.map(product => this.present(product));
  }
}
