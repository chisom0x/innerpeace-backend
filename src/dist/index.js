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
require("dotenv/config");
const app_1 = require("./app");
const config_1 = __importDefault(require("./config/config"));
require("./models/associations");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.default.authenticate();
        console.log('database connected!');
        yield config_1.default.sync({ force: false, alter: true });
    }
    catch (error) {
        console.log(error);
    }
});
connectDB();
const server = (0, app_1.createServer)();
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`api running on ${port}`);
});
//# sourceMappingURL=index.js.map