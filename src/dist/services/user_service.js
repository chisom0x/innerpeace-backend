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
const user_model_1 = __importDefault(require("../models/user_model"));
class UserService {
    static createUser(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_model_1.default.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                });
                return newUser;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error creating user');
            }
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    where: {
                        email: email,
                    },
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map