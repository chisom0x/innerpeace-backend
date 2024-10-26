import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';

export interface DailyAttributes {
  id: number;
  time: string;
  audio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DailyCreationAttributes
  extends Optional<DailyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const Daily: ModelDefined<DailyAttributes, DailyCreationAttributes> =
  sequelize.define(
    'Daily',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      time: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      audio: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'daily',
      timestamps: true,
    }
  );

export default Daily;
