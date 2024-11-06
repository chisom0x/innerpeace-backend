"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'development';
const dbConfig = {
    username: env === 'production' ? process.env.DB_PROD_USERNAME : process.env.DB_DEV_USERNAME,
    password: env === 'production' ? process.env.DB_PROD_PASSWORD : process.env.DB_DEV_PASSWORD,
    database: env === 'production' ? process.env.DB_PROD_DATABASE : process.env.DB_DEV_DATABASE,
    host: env === 'production' ? process.env.DB_PROD_HOST : process.env.DB_DEV_HOST,
    port: Number(env === 'production' ? process.env.DB_PROD_PORT : process.env.DB_DEV_PORT),
    dialect: 'postgres',
    logging: false,
};
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
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
});
exports.default = sequelize;
//# sourceMappingURL=config.js.map