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
const emotions_service_1 = __importDefault(require("../services/emotions_service"));
const date_fns_1 = require("date-fns");
const app_error_1 = __importDefault(require("../utils/app_error"));
const response_1 = require("../utils/response");
const logged_in_user_1 = __importDefault(require("../utils/logged_in_user"));
const user_emotions_service_1 = require("../services/user_emotions_service");
class EmotionsController {
    static addEmotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emotion, photo } = req.body;
            if (!emotion)
                return next(new app_error_1.default('please enter an emotion!', 400));
            if (!photo)
                return next(new app_error_1.default('please enter a photo!', 400));
            try {
                const newEmotion = yield emotions_service_1.default.createEmotion(emotion, photo);
                return (0, response_1.successResponse)(res, newEmotion);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getEmotions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotions = yield emotions_service_1.default.findAllEmotions();
                return (0, response_1.successResponse)(res, emotions);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static addEmotionCauses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cause } = req.body;
            if (!cause)
                return next(new app_error_1.default('please enter an emotion cause!', 400));
            try {
                const emotionCause = yield emotions_service_1.default.createEmotionCause(cause);
                return (0, response_1.successResponse)(res, emotionCause);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getEmotionCauses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotionCauses = yield emotions_service_1.default.findAllEmotionCauses();
                return (0, response_1.successResponse)(res, emotionCauses);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static addDailyEmotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emotionId, causeId } = req.body;
            if (!emotionId)
                return next(new app_error_1.default('please select an emotion!', 400));
            if (!causeId)
                return next(new app_error_1.default('please select a cause!', 400));
            try {
                const userId = yield logged_in_user_1.default.getLoggedInUser(req, res);
                if (userId === 'not-logged-in')
                    return next(new app_error_1.default('please login!', 400));
                yield user_emotions_service_1.UserEmotionsService.addDailyEmotion(userId, emotionId, causeId);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getCurrentWeekEmotion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield logged_in_user_1.default.getLoggedInUser(req, res);
                const records = yield user_emotions_service_1.UserEmotionsService.findCurrentWeekEmotion(userId);
                let recordsArr = [];
                for (const record of records) {
                    const date = new Date(record.get('createdAt'));
                    const dayOfWeek = (0, date_fns_1.format)(date, 'EEEE');
                    const emotion = yield emotions_service_1.default.findOneEmotion(record.get('emotionId'));
                    const cause = yield emotions_service_1.default.findOneEmotionCause(record.get('userId'));
                    recordsArr.push({
                        emotion: emotion === null || emotion === void 0 ? void 0 : emotion.get('emotion'),
                        cause: cause === null || cause === void 0 ? void 0 : cause.get('cause'),
                        day: dayOfWeek,
                    });
                }
                return (0, response_1.successResponse)(res, recordsArr);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getUserEmotions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield logged_in_user_1.default.getLoggedInUser(req, res);
                const records = yield user_emotions_service_1.UserEmotionsService.findAllEmotions(userId);
                let recordsArr = [];
                for (const record of records) {
                    const date = new Date(record.get('createdAt'));
                    const formattedDate = (0, date_fns_1.format)(date, 'd/MM/yyyy');
                    const emotion = yield emotions_service_1.default.findOneEmotion(record.get('emotionId'));
                    const cause = yield emotions_service_1.default.findOneEmotionCause(record.get('userId'));
                    recordsArr.push({
                        emotion: emotion === null || emotion === void 0 ? void 0 : emotion.get('emotion'),
                        cause: cause === null || cause === void 0 ? void 0 : cause.get('cause'),
                        day: formattedDate,
                    });
                }
                return (0, response_1.successResponse)(res, recordsArr);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = EmotionsController;
//# sourceMappingURL=emotions_controller.js.map