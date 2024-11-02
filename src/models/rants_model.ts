import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config';

export interface RantAttributes {
  id: number;
  userId: number;
  name: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RantCreationAttributes
  extends Optional<RantAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const Rant: ModelDefined<RantAttributes, RantCreationAttributes> =
  sequelize.define(
    'Rant',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'rants',
      timestamps: true,
    }
  );

export default Rant;
