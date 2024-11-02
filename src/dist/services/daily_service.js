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
const daily_model_1 = __importDefault(require("../models/daily_model"));
class dailyService {
    static createDaily(time, audio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daily = yield daily_model_1.default.create({
                    time: time,
                    audio: audio,
                });
                return daily;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findDailyByTime(time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daily = yield daily_model_1.default.findOne({ where: { time: time } });
                return daily;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findDailyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daily = yield daily_model_1.default.findByPk(id);
                return daily;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateDaily(id, time, audio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daily = yield daily_model_1.default.findOne({ where: { id } });
                if (!daily) {
                    throw new Error('daily record not found');
                }
                daily.time = time;
                daily.audio = audio;
                const updatedDaily = yield daily.save();
                return updatedDaily;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = dailyService;
//# sourceMappingURL=daily_service.js.map