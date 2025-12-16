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

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - sku
 *               - stockQuantity
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               productCategoryId:
 *                 type: string
 *               sku:
 *                 type: string
 *               stockQuantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: The product was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.get('/', (req, res) => productController.getAllProducts(req, res));
productRouter.post('/', (req, res) => productController.createProduct(req, res));

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               sku:
 *                 type: string
 *               stockQuantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The product was updated
 *       404:
 *         description: The product was not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
productRouter.get('/:id', (req, res) => productController.getProduct(req, res));
productRouter.put('/:id', (req, res) => productController.updateProduct(req, res));
productRouter.delete('/:id', (req, res) => productController.deleteProduct(req, res));

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         productCategoryId:
 *           type: string
 *         sku:
 *           type: string
 *         stockQuantity:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export { productRouter };
