'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const config_js_1 = __importDefault(require("./config.js")); // Import from config.ts compiled to JavaScript
dotenv_1.default.config();
const basename = path_1.default.basename(__filename);
const db = {};
// Initialize models by reading all files in the directory
fs_1.default
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1);
})
    .forEach(file => {
    const model = require(path_1.default.join(__dirname, file))(config_js_1.default, sequelize_1.Sequelize.DataTypes);
    db[model.name] = model;
});
// Set up associations if they exist in the models
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = config_js_1.default;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map