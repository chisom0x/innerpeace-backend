"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' &&
            ext !== '.jpeg' &&
            ext !== '.png' &&
            ext !== '.mp3' &&
            ext !== '.wav' &&
            ext !== '.m4a') {
            return cb(new Error('Only images and audio files are allowed'));
        }
        cb(null, true);
    },
});
exports.default = upload;
//# sourceMappingURL=multer.js.map