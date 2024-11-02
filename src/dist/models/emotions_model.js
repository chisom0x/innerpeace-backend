"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const Emotion = config_1.default.define('Emotion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    emotion: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'emotions',
    timestamps: true,
});
exports.default = Emotion;
//# sourceMappingURL=emotions_model.js.map