/**
 * Product Routes
 * 
 * This file defines the routes for product-related operations.
 * It connects the HTTP endpoints to the appropriate controller methods.
 */

import { Router } from 'express';
import { ProductController } from '@interfaces/controllers/ProductController';
import { container } from 'tsyringe';

// Create router
const productRouter = Router();

// Resolve dependencies using Tsyringe container
const productController = container.resolve(ProductController);

// Define routes
productRouter.get('/:id', (req, res) => productController.getProduct(req, res));
productRouter.get('/', (req, res) => productController.getAllProducts(req, res));
productRouter.post('/', (req, res) => productController.createProduct(req, res));
productRouter.put('/:id', (req, res) => productController.updateProduct(req, res));
productRouter.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export { productRouter };
