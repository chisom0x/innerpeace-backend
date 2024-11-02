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
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
const app_error_1 = __importDefault(require("../utils/app_error"));
const response_1 = require("../utils/response");
const meditation_service_1 = __importDefault(require("../services/meditation_service"));
class meditationController {
    static addMeditation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const photo = req.file;
            if (!title)
                return next(new app_error_1.default('please provide a title!', 400));
            if (!description)
                return next(new app_error_1.default('please provide a description!', 400));
            if (!photo)
                return next(new app_error_1.default('please provide a photo!', 400));
            try {
                const photoUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(photo.buffer);
                yield meditation_service_1.default.createMeditation(title, description, photoUrl);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getAllMeditation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meditation = yield meditation_service_1.default.findMeditations();
                return (0, response_1.successResponse)(res, meditation);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getMeditationById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const meditationId = req.params.meditationId;
            try {
                const meditation = yield meditation_service_1.default.findMeditationById(parseInt(meditationId));
                const topics = yield meditation_service_1.default.findAllTopicsByMeditationId(parseInt(meditationId));
                const data = {
                    description: meditation === null || meditation === void 0 ? void 0 : meditation.get('description'),
                    topics: topics,
                };
                return (0, response_1.successResponse)(res, data);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static addMeditationTopic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const meditationId = req.params.meditationId;
            const { title } = req.body;
            const audio = req.file;
            if (!meditationId)
                return next(new app_error_1.default('please provide a meditationId!', 400));
            if (!title)
                return next(new app_error_1.default('please provide a title!', 400));
            if (!audio)
                return next(new app_error_1.default('please provide a time!', 400));
            try {
                const audioUrl = yield (0, cloudinary_upload_1.uploadAudioBufferToCloudinary)(audio.buffer);
                yield meditation_service_1.default.createMeditationTopic(parseInt(meditationId), title, audioUrl);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getMeditationTopicById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const meditationId = req.params.meditationId;
            try {
                const meditation = yield meditation_service_1.default.findMeditationTopicById(parseInt(meditationId));
                return (0, response_1.successResponse)(res, meditation);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = meditationController;
//# sourceMappingURL=meditation_controller.js.map