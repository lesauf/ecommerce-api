/**
 * Product Routes
 * 
 * This file defines the routes for product-related operations.
 * It connects the HTTP endpoints to the appropriate controller methods.
 */

import { Router } from 'express';
import { ProductController } from '@interfaces/controllers/ProductController';
import { GetProductUseCase } from '@application/useCases/product/GetProductUseCase';
import { InMemoryProductRepository } from '@infrastructure/database/repositories/InMemoryProductRepository';
import { ProductPresenter } from '@interfaces/presenters/ProductPresenter';

// Create router
const productRouter = Router();

// Create dependencies
const productRepository = new InMemoryProductRepository();
const getProductUseCase = new GetProductUseCase(productRepository);
const productPresenter = new ProductPresenter();
const productController = new ProductController(getProductUseCase, productPresenter);

// Define routes
productRouter.get('/:id', (req, res) => productController.getProduct(req, res));
productRouter.get('/', (req, res) => productController.getAllProducts(req, res));
productRouter.post('/', (req, res) => productController.createProduct(req, res));
productRouter.put('/:id', (req, res) => productController.updateProduct(req, res));
productRouter.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export { productRouter };
