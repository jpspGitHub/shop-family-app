import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
