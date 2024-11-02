"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const Sleep = config_1.default.define('Sleep', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    audio: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: false,
        validate: {
            is: /^#[0-9A-F]{6}$/i,
        },
    },
}, {
    tableName: 'sleeps',
    timestamps: true,
});
exports.default = Sleep;
//# sourceMappingURL=sleep_model.js.map