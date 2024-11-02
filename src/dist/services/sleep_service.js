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
const sleep_model_1 = __importDefault(require("../models/sleep_model"));
class sleepService {
    static createSleep(title, photo, audio, color) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSleep = yield sleep_model_1.default.create({
                    title: title,
                    photo: photo,
                    audio: audio,
                    color: color,
                });
                return newSleep;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findAllSleep() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sleep = yield sleep_model_1.default.findAll();
                return sleep;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findSleepById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sleep = yield sleep_model_1.default.findByPk(id);
                return sleep;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateSleep(id, title, photo, audio, color) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sleep = yield sleep_model_1.default.findOne({ where: { id } });
                if (!sleep) {
                    throw new Error('Sleep record not found');
                }
                sleep.title = title;
                sleep.photo = photo;
                sleep.audio = audio;
                sleep.color = color;
                const updatedSleep = yield sleep.save();
                return updatedSleep;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteSleep(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sleep = yield sleep_model_1.default.findOne({ where: { id } });
                if (!sleep) {
                    throw new Error('Sleep record not found');
                }
                yield sleep.destroy();
                return { message: 'Sleep record deleted successfully' };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = sleepService;
//# sourceMappingURL=sleep_service.js.map