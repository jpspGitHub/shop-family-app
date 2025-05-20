// swagger-autogen.cjs
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Shop Family API',
    description: 'Documentación automática del backend para la app de listas familiares',
    version: '1.0.0'
  },
  host: 'localhost:5001',
  basePath: '/',
  schemes: ['http'],
  tags: [
    { name: 'Auth', description: 'Operaciones de autenticación' },
    { name: 'Users', description: 'Operaciones de usuario' },
    { name: 'Groups', description: 'Manejo de grupos' },
    { name: 'Items', description: 'Manejo de ítems en la lista' }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Token JWT (ej: Bearer eyJhbGciOi...)'
      },
      SwaggerTest: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: "Escribí 'SwaggerTest' para usar el usuario de prueba"
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '665123a123abc12312312312' },
          name: { type: 'string', example: 'Pablo Silva' },
          email: { type: 'string', example: 'pablo@example.com' },
          googleId: { type: 'string', example: 'google-oauth-id' },
          avatar: { type: 'string', example: 'https://example.com/avatar.png' },
          phone: { type: 'string', example: '+598987654321' },
          locale: { type: 'string', example: 'es' },
          timezone: { type: 'string', example: 'America/Montevideo' },
          lastLogin: { type: 'string', format: 'date-time', example: '2025-05-20T14:00:00Z' },
          lastLogout: { type: 'string', format: 'date-time', example: '2025-05-20T16:00:00Z' },
          active: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time', example: '2025-05-15T12:00:00Z' }
        }
      },
      UserProfile: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'jwt-token' },
          user: { $ref: '#/components/schemas/User' }
        }
      },
      TokenBlacklist: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'jwt-token-blacklisted' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-05-01T10:00:00Z' }
        }
      },
      Group: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '665abcabcabcabcabcabcabc' },
          name: { type: 'string', example: 'Grupo Familiar' },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                user: { type: 'string', example: '665123a123abc12312312312' },
                role: { type: 'string', enum: ['admin', 'member'], example: 'admin' }
              }
            }
          },
          createdAt: { type: 'string', format: 'date-time', example: '2025-05-10T09:00:00Z' }
        }
      },
      Item: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '664defdefdefdefdefdefdef' },
          name: { type: 'string', example: 'Leche' },
          quantity: { type: 'string', example: '2 litros' },
          isPurchased: { type: 'boolean', example: false },
          groupId: { type: 'string', example: '665abcabcabcabcabcabcabc' },
          addedBy: { type: 'string', example: '665123a123abc12312312312' },
          createdAt: { type: 'string', format: 'date-time', example: '2025-05-20T12:00:00Z' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Token inválido o expirado' }
        }
      }
    }
  }
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
