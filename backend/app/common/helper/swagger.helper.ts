import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hartner Immobilien API",
      version: "1.0.0",
      description: "API documentation for Hartner Immobilien Real Estate portal",
    },
    servers: [
      {
        url: "http://localhost:8000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Parse annotations in routes and controllers
  apis: [
    path.join(process.cwd(), "app/**/*.route.ts"),
    path.join(process.cwd(), "app/**/*.controller.ts"),
    path.join(process.cwd(), "index.ts"),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
