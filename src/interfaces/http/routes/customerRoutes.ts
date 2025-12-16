/**
 * Customer Routes
 */

import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.post('/', customerController.create.bind(customerController));
customerRouter.get('/:id', customerController.getById.bind(customerController));

export { customerRouter };
