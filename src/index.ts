import 'dotenv/config';
import { createServer } from './app';
import sequelize from './config/config';
import './models/associations';

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
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log();
  console.log(`api running on ${port} -- ${process.env.PORT}`);
});
