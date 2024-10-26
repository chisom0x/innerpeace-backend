import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/config.ts';
import UserEmotions from './user_emotions_model.ts';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          const userInstance = user as any; // Type casting
          const password = userInstance.password;
          if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userInstance.password = hashedPassword;
          }
        },
        beforeUpdate: async (user: any) => {
          const password = user.getDataValue('password');
          if (password && user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.setDataValue('password', hashedPassword);
          }
        },
      },
    }
  );

export default User;
