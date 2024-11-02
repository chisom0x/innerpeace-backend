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
const rants_service_1 = __importDefault(require("../services/rants_service"));
class RantController {
    static addRant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, text } = req.body;
            if (!userId)
                return next(new app_error_1.default('Please provide a userId!', 400));
            if (!name)
                return next(new app_error_1.default('Please provide a name!', 400));
            if (!text)
                return next(new app_error_1.default('Please provide a rant text!', 400));
            try {
                yield rants_service_1.default.createRant(userId, name, text);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getAllRants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rants = yield rants_service_1.default.getAllRants();
                return (0, response_1.successResponse)(res, rants);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getRantById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const rantId = req.params.rantId;
            try {
                const rant = yield rants_service_1.default.getRantById(parseInt(rantId));
                return (0, response_1.successResponse)(res, rant);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getUserRants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const rant = yield rants_service_1.default.myRants(parseInt(userId));
                return (0, response_1.successResponse)(res, rant);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static addRantComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, text } = req.body;
            const rantId = req.params.rantId;
            if (!userId)
                return next(new app_error_1.default('Please provide a userId!', 400));
            if (!rantId)
                return next(new app_error_1.default('Please provide a rantId!', 400));
            if (!name)
                return next(new app_error_1.default('Please provide a name!', 400));
            if (!text)
                return next(new app_error_1.default('Please provide a comment text!', 400));
            try {
                yield rants_service_1.default.createRantComment(userId, parseInt(rantId), name, text);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deleteRant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const rantId = req.params.rantId;
            try {
                yield rants_service_1.default.deleteRant(parseInt(rantId));
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deleteRantComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            try {
                yield rants_service_1.default.deleteRantComment(parseInt(commentId));
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = RantController;
//# sourceMappingURL=rants_controller.js.map