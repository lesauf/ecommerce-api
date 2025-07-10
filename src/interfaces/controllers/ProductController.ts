/**
 * Product Controller Implementation
 * 
 * This class implements the ProductControllerInterface from the application layer.
 * It adapts the HTTP request/response model to the application layer use cases.
 */

import { Request, Response } from 'express';
import { ProductControllerInterface } from '@application/interfaces/controllers/ProductControllerInterface';
import { GetProductUseCase } from '@application/useCases/product/GetProductUseCase';
import { ProductPresenter } from '../presenters/ProductPresenter';

export class ProductController implements ProductControllerInterface {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly productPresenter: ProductPresenter
  ) {}

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Execute the use case
      const result = await this.getProductUseCase.execute({ id });

      // If product not found, return 404
      if (!result.product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      // Format the response using the presenter
      const presentableProduct = this.productPresenter.present(result.product);

      // Return the response
      res.status(200).json(presentableProduct);
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    // Implementation would use a GetAllProductsUseCase
    res.status(501).json({ message: 'Not implemented yet' });
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    // Implementation would use a CreateProductUseCase
    res.status(501).json({ message: 'Not implemented yet' });
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    // Implementation would use an UpdateProductUseCase
    res.status(501).json({ message: 'Not implemented yet' });
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    // Implementation would use a DeleteProductUseCase
    res.status(501).json({ message: 'Not implemented yet' });
  }
}
