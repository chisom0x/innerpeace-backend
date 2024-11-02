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
const emotions_model_1 = __importDefault(require("../models/emotions_model"));
const emotion_cause_model_1 = __importDefault(require("../models/emotion_cause_model"));
class EmotionService {
    static createEmotion(emotion, photo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmotion = yield emotions_model_1.default.create({
                    emotion: emotion,
                    photo: photo,
                });
                return newEmotion;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findAllEmotions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotions = yield emotions_model_1.default.findAll();
                return emotions;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findOneEmotion(emotionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotion = yield emotions_model_1.default.findByPk(emotionId);
                return emotion;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createEmotionCause(cause) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotionCause = yield emotion_cause_model_1.default.create({ cause: cause });
                return emotionCause;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findOneEmotionCause(causeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cause = yield emotion_cause_model_1.default.findByPk(causeId);
                return cause;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findAllEmotionCauses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emotions = yield emotion_cause_model_1.default.findAll();
                return emotions;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = EmotionService;
//# sourceMappingURL=emotions_service.js.map