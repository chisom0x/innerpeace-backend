import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../config/config';

export interface MeditationTopicAttributes {
  id: number;
  meditationId: number;
  title: string;
  audio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MeditationTopicCreationAttributes
  extends Optional<MeditationTopicAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const MeditationTopic: ModelDefined<MeditationTopicAttributes, MeditationTopicCreationAttributes> =
  sequelize.define(
    'MeditationTopic',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      meditationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'meditations', // The model you are associating with
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      audio: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: 'meditationtopics',
      timestamps: true,
    }
  );

export default MeditationTopic;
