"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const MeditationTopic = config_1.default.define('MeditationTopic', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    meditationId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'meditations', // The model you are associating with
            key: 'id',
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    audio: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'meditationtopics',
    timestamps: true,
});
exports.default = MeditationTopic;
//# sourceMappingURL=meditation_topics_model.js.map