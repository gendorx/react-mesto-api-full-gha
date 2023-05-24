require('dotenv').config();

const {
  HOST, PORT, DATABASE_URL, JWT_SECRET, NODE_ENV,
} = process.env;

const config = {
  isProduction: NODE_ENV === 'production',
  HOST: HOST || '127.0.0.1',
  PORT: PORT || 3000,
  DATABASE_URL: DATABASE_URL || 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET: JWT_SECRET || 'superpuperpassword',
};

module.exports = config;
