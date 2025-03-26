// src/config/swagger.ts (or wherever it's located)
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API",
      version: "1.0.0",
      description: "Documentation for Admin API",
    },
    tags: [
      {
        name: "User Management",
        description: "User related operations",
      },
      {
        name: "Categories",
        description: "Category related operations",
      },
      {
        name: "Products",
        description: "Products related operations",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // Adjust if needed
};

const specs = swaggerJsdoc(options);

export default specs;
