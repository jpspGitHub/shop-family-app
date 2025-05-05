// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const ROUTES = require('./utils/routes');

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

module.exports = app;
