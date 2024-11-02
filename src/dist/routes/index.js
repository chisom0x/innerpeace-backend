"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth_routes"));
const emotions_routes_1 = __importDefault(require("./emotions_routes"));
const sleep_routes_1 = __importDefault(require("./sleep_routes"));
const daily_routes_1 = __importDefault(require("./daily_routes"));
const meditation_routes_1 = __importDefault(require("./meditation_routes"));
const rants_routes_1 = __importDefault(require("./rants_routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/emotions', emotions_routes_1.default);
router.use('/sleep', sleep_routes_1.default);
router.use('/daily', daily_routes_1.default);
router.use('/meditation', meditation_routes_1.default);
router.use('/rant', rants_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map