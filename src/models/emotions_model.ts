import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config';
import UserEmotions from './user_emotions_model';

export interface EmotionAttributes {
  id: number;
  emotion: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmotionCreationAttributes
  extends Optional<EmotionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const Emotion: ModelDefined<EmotionAttributes, EmotionCreationAttributes> =
  sequelize.define(
    'Emotion',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      emotion: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'emotions',
      timestamps: true,
    }
  );

export default Emotion;
