import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
  logging: boolean;
  ssl?: boolean; 
}

const env = process.env.NODE_ENV || 'development';

const dbConfig: DBConfig = {
  username: env === 'production' ? process.env.DB_PROD_USERNAME! : process.env.DB_DEV_USERNAME!,
  password: env === 'production' ? process.env.DB_PROD_PASSWORD! : process.env.DB_DEV_PASSWORD!,
  database: env === 'production' ? process.env.DB_PROD_DATABASE! : process.env.DB_DEV_DATABASE!,
  host: env === 'production' ? process.env.DB_PROD_HOST! : process.env.DB_DEV_HOST!,
  port: Number(env === 'production' ? process.env.DB_PROD_PORT! : process.env.DB_DEV_PORT!),
  dialect: 'postgres',
  logging: false,
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: env === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    } : {}
  }
);

export default sequelize;
