import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';

export interface MeditationAttributes {
  id: number;
  title: string;
  description: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MeditationCreationAttributes
  extends Optional<MeditationAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const Meditation: ModelDefined<MeditationAttributes, MeditationCreationAttributes> =
  sequelize.define(
    'Meditation',
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'meditations',
      timestamps: true,
    }
  );

export default Meditation;
