import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Log environment variables to verify they are loaded correctly
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_DEV_USERNAME:', process.env.DB_DEV_USERNAME);
console.log('DB_DEV_PASSWORD:', process.env.DB_DEV_PASSWORD);
console.log('DB_DEV_DATABASE:', process.env.DB_DEV_DATABASE);
console.log('DB_DEV_HOST:', process.env.DB_DEV_HOST);
console.log('DB_DEV_PORT:', process.env.DB_DEV_PORT);
console.log('DB_PROD_USERNAME:', process.env.DB_PROD_USERNAME);
console.log('DB_PROD_PASSWORD:', process.env.DB_PROD_PASSWORD);
console.log('DB_PROD_DATABASE:', process.env.DB_PROD_DATABASE);
console.log('DB_PROD_HOST:', process.env.DB_PROD_HOST);
console.log('DB_PROD_PORT:', process.env.DB_PROD_PORT);

// Define the configuration interface for our environment variables
interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
  logging: boolean;
}

// Determine the environment (default to 'development' if not specified)
const env = process.env.NODE_ENV || 'development';

// Set up database credentials based on the current environment
const dbConfig: DBConfig = {
  username: env === 'production' ? process.env.DB_PROD_USERNAME! : process.env.DB_DEV_USERNAME!,
  password: env === 'production' ? process.env.DB_PROD_PASSWORD! : process.env.DB_DEV_PASSWORD!,
  database: env === 'production' ? process.env.DB_PROD_DATABASE! : process.env.DB_DEV_DATABASE!,
  host: env === 'production' ? process.env.DB_PROD_HOST! : process.env.DB_DEV_HOST!,
  port: Number(env === 'production' ? process.env.DB_PROD_PORT! : process.env.DB_DEV_PORT!),
  dialect: 'postgres',
  logging: false,
};

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

console.log('Database Config:', dbConfig);

export default  sequelize ;
