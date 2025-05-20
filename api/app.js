// app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const swaggerDocument = require('./docs/swagger.json');


import authRoutes from './routes/auth.js';
import groupRoutes from './routes/groups.js';
import itemRoutes from './routes/items.js';
import userRoutes from './routes/users.js';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Root check
app.get('/', (req, res) => {
  res.send('🛒 Shopping List API is running!');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
