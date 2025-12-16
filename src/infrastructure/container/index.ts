/**
 * Dependency Injection Container Configuration
 * 
 * This file configures the Tsyringe dependency injection container.
 * It registers all the dependencies that will be injected throughout the application.
 */

import { container } from 'tsyringe';
import { autoDiscoverAndRegisterRepositories } from './autoProviders';

// Auto-discover repository implementations and alias the selected engine to the interface token
autoDiscoverAndRegisterRepositories();

export { container };