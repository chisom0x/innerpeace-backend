"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("./../config/config"));
console.log(config_1.default instanceof sequelize_1.Sequelize);
const User = config_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const userInstance = user; // Type casting
            const password = userInstance.password;
            if (password) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                userInstance.password = hashedPassword;
            }
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const password = user.getDataValue('password');
            if (password && user.changed('password')) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                user.setDataValue('password', hashedPassword);
            }
        }),
    },
});
exports.default = User;
//# sourceMappingURL=user_model.js.map