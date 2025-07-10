/**
 * Product Controller Interface
 * 
 * This interface defines the contract for the product controller.
 * It follows the ports and adapters pattern, where the application layer
 * defines ports (interfaces) that are implemented by adapters (controllers)
 * in the interfaces layer.
 */

export interface ProductControllerInterface {
  getProduct(req: any, res: any): Promise<void>;
  getAllProducts(req: any, res: any): Promise<void>;
  createProduct(req: any, res: any): Promise<void>;
  updateProduct(req: any, res: any): Promise<void>;
  deleteProduct(req: any, res: any): Promise<void>;
}