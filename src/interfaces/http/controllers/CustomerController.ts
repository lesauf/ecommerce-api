/**
 * Customer Controller
 * 
 * Handles HTTP requests for Customer operations.
 */

import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { CreateCustomerUseCase } from '@application/useCases/customer/CreateCustomerUseCase';
import { GetCustomerUseCase } from '@application/useCases/customer/GetCustomerUseCase';

export class CustomerController {
  
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = container.resolve(CreateCustomerUseCase);
      const result = await useCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = container.resolve(GetCustomerUseCase);
      const result = await useCase.execute(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
