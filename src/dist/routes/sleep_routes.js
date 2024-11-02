"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_controller_1 = __importDefault(require("../controllers/sleep_controller"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/add-sleep', multer_1.default.fields([{ name: 'photo' }, { name: 'audio' }]), sleep_controller_1.default.addSleep);
router.get('/all', sleep_controller_1.default.getAllSleepSounds);
router.get('/:soundId', sleep_controller_1.default.getSleepSoundById);
router.patch('/update/:soundId', multer_1.default.fields([{ name: 'photo' }, { name: 'audio' }]), sleep_controller_1.default.updateSleepSound);
router.delete('/delete/:soundId', sleep_controller_1.default.deleteSleepSound);
exports.default = router;
//# sourceMappingURL=sleep_routes.js.map