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
const rants_model_1 = __importDefault(require("../models/rants_model"));
const rants_comments_model_1 = __importDefault(require("../models/rants_comments_model"));
class rantsService {
    static createRant(userId, name, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rant = yield rants_model_1.default.create({
                    userId,
                    name,
                    text,
                });
                return rant;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getRantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rant = yield rants_model_1.default.findOne({
                    where: { id },
                    include: [
                        {
                            model: rants_comments_model_1.default,
                            as: 'comments', // Include associated comments
                        },
                    ],
                });
                if (!rant) {
                    throw new Error('Rant not found');
                }
                return rant;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteRant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rant = yield rants_model_1.default.findOne({ where: { id } });
                if (!rant) {
                    throw new Error('Rant not found');
                }
                yield rant.destroy();
                return { message: 'Rant deleted successfully' };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static myRants(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rant = yield rants_model_1.default.findAll({ where: { userId: id } });
                if (!rant) {
                    throw new Error('Rant not found');
                }
                return rant;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createRantComment(userId, rantId, name, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rantComment = yield rants_comments_model_1.default.create({
                    userId,
                    rantId,
                    name,
                    text,
                });
                return rantComment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteRantComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rantComment = yield rants_comments_model_1.default.findOne({ where: { id } });
                if (!rantComment) {
                    throw new Error('Rant comment not found');
                }
                yield rantComment.destroy();
                return { message: 'Rant comment deleted successfully' };
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAllRants() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rants = yield rants_model_1.default.findAll();
                return rants;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = rantsService;
//# sourceMappingURL=rants_service.js.map