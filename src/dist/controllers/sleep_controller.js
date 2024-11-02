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
const app_error_1 = __importDefault(require("../utils/app_error"));
const response_1 = require("../utils/response");
const sleep_service_1 = __importDefault(require("../services/sleep_service"));
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
class sleepController {
    static addSleep(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, color } = req.body;
            const { photo, audio } = req.files;
            if (!title)
                return next(new app_error_1.default('please provide a title!', 400));
            if (!color)
                return next(new app_error_1.default('please provide a color!', 400));
            if (!photo || !photo[0])
                return next(new app_error_1.default('Please provide a photo!', 400));
            if (!audio || !audio[0])
                return next(new app_error_1.default('Please provide an audio file!', 400));
            try {
                const photoUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(photo[0].buffer);
                const audioUrl = yield (0, cloudinary_upload_1.uploadAudioBufferToCloudinary)(audio[0].buffer);
                yield sleep_service_1.default.createSleep(title, photoUrl, audioUrl, color);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getAllSleepSounds(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let soundsArr = [];
                const sleepSounds = yield sleep_service_1.default.findAllSleep();
                for (const sound of sleepSounds) {
                    soundsArr.push({
                        title: sound === null || sound === void 0 ? void 0 : sound.get('title'),
                        photo: sound === null || sound === void 0 ? void 0 : sound.get('photo'),
                        audio: sound === null || sound === void 0 ? void 0 : sound.get('audio'),
                        color: sound === null || sound === void 0 ? void 0 : sound.get('color'),
                    });
                }
                return (0, response_1.successResponse)(res, soundsArr);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getSleepSoundById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundId = req.params.soundId;
            console.log(soundId);
            const convSoundId = parseInt(soundId);
            try {
                const sleepSound = yield sleep_service_1.default.findSleepById(convSoundId);
                return (0, response_1.successResponse)(res, sleepSound);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static updateSleepSound(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundId = req.params.soundId;
            if (!soundId)
                return next(new app_error_1.default('please provide an id!', 400));
            const { title, color } = req.body;
            try {
                const { photo, audio } = req.files;
                const photoUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(photo[0].buffer);
                const audioUrl = yield (0, cloudinary_upload_1.uploadAudioBufferToCloudinary)(audio[0].buffer);
                yield sleep_service_1.default.updateSleep(parseInt(soundId), title, photoUrl, audioUrl, color);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static deleteSleepSound(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const soundId = req.params.soundId;
            try {
                yield sleep_service_1.default.deleteSleep(parseInt(soundId));
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = sleepController;
//# sourceMappingURL=sleep_controller.js.map