// Centralized DI tokens for repositories and services
// Using Symbols prevents string collisions and improves typing

export const ProductRepositoryToken = Symbol('ProductRepositoryInterface');
export const CustomerRepositoryToken = Symbol('CustomerRepositoryInterface');