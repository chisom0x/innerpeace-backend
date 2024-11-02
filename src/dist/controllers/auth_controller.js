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
const user_service_1 = __importDefault(require("../services/user_service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_error_1 = __importDefault(require("../utils/app_error"));
const jwt_helper_1 = __importDefault(require("../utils/jwt_helper"));
class Authentication {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = req.body;
            try {
                if (!firstName)
                    return next(new app_error_1.default('Please enter your first name!', 400));
                if (!lastName)
                    return next(new app_error_1.default('please enter your lastname!', 400));
                if (!email)
                    return next(new app_error_1.default('please enter your email address!', 400));
                if (!password)
                    return next(new app_error_1.default('please set a password!', 400));
                //validate email!
                const userExists = yield user_service_1.default.findUserByEmail(email);
                if (userExists)
                    return next(new app_error_1.default('email already in use!', 400));
                const user = yield user_service_1.default.createUser(firstName, lastName, email, password);
                return (0, jwt_helper_1.default)(user, 200, res);
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email)
                return next(new app_error_1.default('please enter your email address', 400));
            if (!password)
                return next(new app_error_1.default('please enter a password', 400));
            try {
                const user = yield user_service_1.default.findUserByEmail(email);
                let userPass = !user ? 'no_user' : user.password;
                const pass = yield bcryptjs_1.default.compare(password, userPass);
                if (user && pass)
                    return (0, jwt_helper_1.default)(user, 200, res);
                return next(new app_error_1.default('incorrect email or password!', 400));
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.default = Authentication;
//# sourceMappingURL=auth_controller.js.map