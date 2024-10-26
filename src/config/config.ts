import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('innerpeace', 'postgres', 'kelvin', {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false
});

export default sequelize;
