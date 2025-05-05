const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Shopping List API',
    description: 'Auto-generated Swagger documentation'
  },
  host: 'localhost:5000',
  schemes: ['http'],
  tags: [
    { name: 'Items', description: 'Shopping list items' }
  ]
};

const outputFile = './docs/swagger.json';
const endpointsFiles = [
  './routes/items.js',
  './routes/auth.js',
  './routes/groups.js',
  './routes/users.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
