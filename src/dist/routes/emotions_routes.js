"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emotions_controller_1 = __importDefault(require("../controllers/emotions_controller"));
const router = (0, express_1.Router)();
router.post('/add-emotion', emotions_controller_1.default.addEmotion);
router.post('/add-emotion-cause', emotions_controller_1.default.addEmotionCauses);
router.get('/', emotions_controller_1.default.getEmotions);
router.get('/causes', emotions_controller_1.default.getEmotionCauses);
router.post('/new-daily-entry', emotions_controller_1.default.addDailyEmotion);
router.get('/current-week', emotions_controller_1.default.getCurrentWeekEmotion);
router.get('/all-user-emotions', emotions_controller_1.default.getUserEmotions);
exports.default = router;
//# sourceMappingURL=emotions_routes.js.map