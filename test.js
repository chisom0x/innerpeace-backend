const dotenv = require('dotenv')
dotenv.config();
console.log({
    DB_PROD_USERNAME: process.env.DB_PROD_USERNAME,
    DB_DEV_USERNAME: process.env.DB_DEV_USERNAME,
    DB_PROD_PASSWORD: process.env.DB_PROD_PASSWORD,
    DB_DEV_PASSWORD: process.env.DB_DEV_PASSWORD,
    DB_PROD_DATABASE: process.env.DB_PROD_DATABASE,
    DB_DEV_DATABASE: process.env.DB_DEV_DATABASE,
    DB_PROD_HOST: process.env.DB_PROD_HOST,
    DB_DEV_HOST: process.env.DB_DEV_HOST,
    DB_PROD_PORT: process.env.DB_PROD_PORT,
    DB_DEV_PORT: process.env.DB_DEV_PORT,
  });
  