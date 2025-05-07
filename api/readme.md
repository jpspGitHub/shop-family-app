# Shop Family API - Backend (Node.js + MongoDB)

This is the backend server for the Shop Family App, a collaborative shopping list application. The API is built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and supports **Google Sign-In Authentication**.

---

## 📦 Features

- User authentication with Google OAuth (via Firebase or direct token validation)
- JWT session management
- Group management (create, join, leave groups)
- Item management (add, update, remove items from group lists)
- API documentation using Swagger
- Modular architecture with service, data access, and controller layers
- Ready-to-test with Jest

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shop-family-backend.git
cd shop-family-backend/api
```

### 2. Install Dependencies
```bash
cd shop-family-app/api
npm install

```

### 3. Configure Environment Variables
Create the following files:

#### `.env.development`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shop_family_dev
JWT_SECRET=supersecretkey
USE_AUTH_MOCK=true
```

#### `.env.test`
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/shop_family_test
JWT_SECRET=supersecretkey
USE_AUTH_MOCK=true
```
### 4.Agregar el archivo de Firebase serviceAccountKey.json:

#### Ir a Firebase Console → Configuración → Cuentas de servicio

#### Descargar la clave privada

#### Guardarla en config/serviceAccountKey.json

### 5. Run MongoDB Locally
```bash
mkdir -p ~/mongodb/data/db
mongod --dbpath ~/mongodb/data/db
```

> Make sure `mongod` is installed. You can download it from [MongoDB Community](https://www.mongodb.com/try/download/community).

---

## 🧪 Running Tests

```bash
npm run test
```

> You can also debug tests in VS Code by configuring the Jest runner and launching with breakpoints.

---

## 🔧 Development Mode

```bash
npm run dev
```
> This runs the server with `nodemon` and the `.env.development` config.

---

## 🔗 API Endpoints

All endpoints are prefixed with `/api`

### Auth
- `POST /api/auth/google` — Login with Google token

### Users
- `GET /api/users/me` — Get current user profile (requires token)

### Groups
- `GET /api/groups/`
- `POST /api/groups/`
- `POST /api/groups/:groupId/join`

### Items
- `GET /api/items/`
- `POST /api/items/`
- `PUT /api/items/:itemId`
- `DELETE /api/items/:itemId`

---

## 📚 API Documentation

Run the app and visit:
```
http://localhost:5000/api-docs
```

---

## 🧱 Project Structure
```
src/
|-- config/            # DB and App configuration
|-- controllers/       # Route handlers
|-- dataaccess/        # Mongoose queries
|-- routes/            # Express routers
|-- services/          # Business logic
|-- serviceagents/     # External agents (e.g., authAgent)
|-- middleware/        # Auth and error middleware
|-- utils/             # Route constants, helpers
|-- tests/             # Jest test suites
```

---

## 🧠 Notes
- By default, `USE_AUTH_MOCK=true` enables mocked Google login for testing
- You can switch to real Google token verification by setting `USE_AUTH_MOCK=false`
- All protected routes require `Authorization: Bearer <token>` header

---

## 📜 License
MIT License - feel free to fork and contribute!
