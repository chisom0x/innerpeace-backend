"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rants_controller_1 = __importDefault(require("../controllers/rants_controller"));
const router = (0, express_1.Router)();
router.post('/add-rant', rants_controller_1.default.addRant);
router.get('/all-rants', rants_controller_1.default.getAllRants);
router.get('/my-rants/:userId', rants_controller_1.default.getUserRants);
router.get('/:rantId', rants_controller_1.default.getRantById);
router.post('/add-comment/:rantId', rants_controller_1.default.addRantComment);
router.delete('/delete-rant/:rantId', rants_controller_1.default.deleteRant);
router.delete('/delete-comment/:commentId', rants_controller_1.default.deleteRantComment);
exports.default = router;
//# sourceMappingURL=rants_routes.js.map