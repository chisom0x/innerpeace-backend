import { DataTypes, Sequelize, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config.ts';

export interface RantCommentAttributes {
  id: number;
  userId: number;
  rantId: number;
  name: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RantCommentCreationAttributes
  extends Optional<RantCommentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const RantComment: ModelDefined<RantCommentAttributes, RantCommentCreationAttributes> =
  sequelize.define(
    'RantComment',
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
      rantId: {
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
      tableName: 'rant_comments',
      timestamps: true,
    }
  );

export default RantComment;
