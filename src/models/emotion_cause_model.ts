import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';

export interface EmotionCauseAttributes {
  id: number;
  cause: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmotionCauseCreationAttributes
  extends Optional<EmotionCauseAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const EmotionCause: ModelDefined<
  EmotionCauseAttributes,
  EmotionCauseCreationAttributes
> = sequelize.define(
  'EmotionCause',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cause: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'emotioncauses',
    timestamps: true,
  }
);

export default EmotionCause;
