import { createServer } from './app';
import sequelize from './config/config.ts';
import './models/associations.ts';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected!');
    await sequelize.sync({ force: false, alter: true });
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const server = createServer();
const port = 5000;
server.listen(port, () => {
  console.log(`api running on ${port}`);
});
