import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';
import User from './user_model.ts';
import Emotion from './emotions_model.ts';
import EmotionCause from './emotion_cause_model.ts';

export interface UserEmotionsAttributes {
  id: number;
  userId: number;
  emotionId: number;
  causeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserEmotionsCreationAttributes
  extends Optional<UserEmotionsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const UserEmotions: ModelDefined<
  UserEmotionsAttributes,
  UserEmotionsCreationAttributes
> = sequelize.define(
  'UserEmotions',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    causeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'useremotions',
    timestamps: true,
  }
);

export default UserEmotions;
