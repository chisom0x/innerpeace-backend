"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../middlewares/multer"));
const daily_controller_1 = __importDefault(require("../controllers/daily_controller"));
const router = (0, express_1.Router)();
router.post('/add-daily-sound', multer_1.default.single('audio'), daily_controller_1.default.addDaily);
router.get('/time', daily_controller_1.default.getDailyByTime);
router.get('/:dailyId', daily_controller_1.default.getDailyById);
router.patch('/update/:dailyId', multer_1.default.single('audio'), daily_controller_1.default.updateDaily);
exports.default = router;
//# sourceMappingURL=daily_routes.js.map