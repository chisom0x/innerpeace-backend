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
const meditation_model_1 = __importDefault(require("../models/meditation_model"));
const meditation_topics_model_1 = __importDefault(require("../models/meditation_topics_model"));
class meditationService {
    static createMeditation(title, description, photo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditation = yield meditation_model_1.default.create({
                    title: title,
                    description: description,
                    photo: photo,
                });
                return meditation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findMeditationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditation = yield meditation_model_1.default.findByPk(id);
                return meditation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findMeditations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditation = yield meditation_model_1.default.findAll();
                return meditation;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createMeditationTopic(meditationId, title, audio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditationTopic = yield meditation_topics_model_1.default.create({
                    meditationId: meditationId,
                    title: title,
                    audio: audio,
                });
                return meditationTopic;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findAllTopicsByMeditationId(meditationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topics = yield meditation_topics_model_1.default.findAll({
                    where: {
                        meditationId: meditationId,
                    },
                });
                return topics;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findMeditationTopicById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditationTopic = yield meditation_topics_model_1.default.findByPk(id);
                return meditationTopic;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = meditationService;
//# sourceMappingURL=meditation_service.js.map