import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';

export interface SleepAttributes {
  id: number;
  title: string;
  photo: string;
  audio: string;
  color: string; // Added color field
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SleepCreationAttributes
  extends Optional<SleepAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const Sleep: ModelDefined<SleepAttributes, SleepCreationAttributes> = sequelize.define(
  'Sleep',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    audio: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7), 
      allowNull: false,
      validate: {
        is: /^#[0-9A-F]{6}$/i,
      },
    },
  },
  {
    tableName: 'sleeps',
    timestamps: true,
  }
);

export default Sleep;
