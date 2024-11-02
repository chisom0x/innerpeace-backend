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
exports.UserEmotionsService = void 0;
const sequelize_1 = require("sequelize");
const user_emotions_model_1 = __importDefault(require("../models/user_emotions_model"));
const date_fns_1 = require("date-fns");
class UserEmotionsService {
    static addDailyEmotion(userId, emotionId, causeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmotion = yield user_emotions_model_1.default.create({
                    userId: userId,
                    emotionId: emotionId,
                    causeId: causeId,
                });
                return newEmotion;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findCurrentWeekEmotion(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const oneWeekAgo = (0, date_fns_1.subDays)(new Date(), 7);
            try {
                const records = yield user_emotions_model_1.default.findAll({
                    where: {
                        userId: userId,
                        createdAt: {
                            [sequelize_1.Op.gte]: oneWeekAgo,
                            [sequelize_1.Op.lte]: today,
                        },
                    },
                });
                return records;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findAllEmotions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recentRecords = yield user_emotions_model_1.default.findAll({
                    where: { userId: userId },
                    order: [['createdAt', 'DESC']],
                    limit: 30,
                });
                return recentRecords;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserEmotionsService = UserEmotionsService;
//# sourceMappingURL=user_emotions_service.js.map