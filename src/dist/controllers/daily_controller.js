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
const daily_service_1 = __importDefault(require("../services/daily_service"));
class dailyController {
    static addDaily(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { time } = req.body;
            const audio = req.file;
            if (!time)
                return next(new app_error_1.default('please provide a time!', 400));
            if (!audio)
                return next(new app_error_1.default('please provide a audio!', 400));
            try {
                const audioUrl = yield (0, cloudinary_upload_1.uploadAudioBufferToCloudinary)(audio.buffer);
                yield daily_service_1.default.createDaily(time, audioUrl);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getDailyByTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = req.query.time;
            if (!time)
                return next(new app_error_1.default('please provide a time!', 400));
            try {
                const daily = yield daily_service_1.default.findDailyByTime(time);
                return (0, response_1.successResponse)(res, daily);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static getDailyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.dailyId;
            if (!id)
                return next(new app_error_1.default('please provide a id!', 400));
            try {
                const daily = yield daily_service_1.default.findDailyById(parseInt(id));
                return (0, response_1.successResponse)(res, daily);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static updateDaily(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyId = req.params.dailyId;
            const { time } = req.body;
            const audio = req.file;
            if (!dailyId)
                return next(new app_error_1.default('Please provide an ID!', 400));
            if (!time)
                return next(new app_error_1.default('Please provide a time!', 400));
            if (!audio)
                return next(new app_error_1.default('Please provide an audio!', 400));
            try {
                const audioUrl = yield (0, cloudinary_upload_1.uploadAudioBufferToCloudinary)(audio.buffer);
                const updatedDaily = yield daily_service_1.default.updateDaily(parseInt(dailyId), time, audioUrl);
                return (0, response_1.successResponse)(res, updatedDaily);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = dailyController;
//# sourceMappingURL=daily_controller.js.map