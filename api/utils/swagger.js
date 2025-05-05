// utils/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping List API',
      version: '1.0.0',
      description: 'API documentation for the family shopping list app'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js', './__tests__/*.js'], // incluye rutas y test con anotaciones
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
