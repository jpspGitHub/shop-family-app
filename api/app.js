// app.js
import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import authRoutes from './routes/auth';
import groupRoutes from './routes/groups';
import itemRoutes from './routes/items';
import userRoutes from './routes/users';
import ROUTES from './utils/routes';

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(ROUTES.AUTH, authRoutes);
app.use(ROUTES.GROUPS, groupRoutes);
app.use(ROUTES.ITEMS, itemRoutes);
app.use(ROUTES.USERS, userRoutes);

// Root check
app.get('/', (req, res) => {
  res.send('🛒 Shopping List API is running!');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
