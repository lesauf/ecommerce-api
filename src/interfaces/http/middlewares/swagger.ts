import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Router } from 'express';

const options: swaggerJSDoc.Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce application',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/interfaces/http/routes/*.ts',
    './src/infrastructure/http/routes/*.ts', 
    './src/interfaces/http/controllers/*.ts' 
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { swaggerRouter, swaggerSpec };
