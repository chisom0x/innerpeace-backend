"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meditation_controller_1 = __importDefault(require("../controllers/meditation_controller"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = (0, express_1.Router)();
router.post('/add-meditation', multer_1.default.single('photo'), meditation_controller_1.default.addMeditation);
router.post('/topic/add-topic/:meditationId', multer_1.default.single('audio'), meditation_controller_1.default.addMeditationTopic);
router.get('/all', meditation_controller_1.default.getAllMeditation);
router.get('/:meditationId', meditation_controller_1.default.getMeditationById);
router.get('/topic/:meditationId', meditation_controller_1.default.getMeditationTopicById);
exports.default = router;
//# sourceMappingURL=meditation_routes.js.map