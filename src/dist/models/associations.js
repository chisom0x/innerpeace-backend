"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_emotions_model_1 = __importDefault(require("./user_emotions_model"));
const user_model_1 = __importDefault(require("./user_model"));
const emotions_model_1 = __importDefault(require("./emotions_model"));
const emotion_cause_model_1 = __importDefault(require("./emotion_cause_model"));
const meditation_model_1 = __importDefault(require("./meditation_model"));
const meditation_topics_model_1 = __importDefault(require("./meditation_topics_model"));
const rants_model_1 = __importDefault(require("./rants_model"));
const rants_comments_model_1 = __importDefault(require("./rants_comments_model"));
// Many UserEmotions for one User
user_emotions_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});
// Many UserEmotions for one Emotion
user_emotions_model_1.default.belongsTo(emotions_model_1.default, {
    foreignKey: 'emotionId',
    onDelete: 'CASCADE',
});
// Many UserEmotions for one EmotionCause
user_emotions_model_1.default.belongsTo(emotion_cause_model_1.default, {
    foreignKey: 'causeId',
    onDelete: 'CASCADE',
});
// One User has many UserEmotions
user_model_1.default.hasMany(user_emotions_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});
// One Emotion has many UserEmotions
emotions_model_1.default.hasMany(user_emotions_model_1.default, {
    foreignKey: 'emotionId',
    onDelete: 'CASCADE',
});
// One EmotionCause has many UserEmotions
emotion_cause_model_1.default.hasMany(user_emotions_model_1.default, {
    foreignKey: 'causeId',
    onDelete: 'CASCADE',
});
// One Meditation has many MeditationTopics
meditation_model_1.default.hasMany(meditation_topics_model_1.default, {
    foreignKey: 'meditationId',
    as: 'topics',
});
// Many MeditationTopics belong to one Meditation
meditation_topics_model_1.default.belongsTo(meditation_model_1.default, {
    foreignKey: 'meditationId',
    as: 'meditation',
});
// One Rant has many RantComments
rants_model_1.default.hasMany(rants_comments_model_1.default, {
    foreignKey: 'rantId',
    as: 'comments',
    onDelete: 'CASCADE',
});
// Many RantComments belong to one Rant
rants_comments_model_1.default.belongsTo(rants_model_1.default, {
    foreignKey: 'rantId',
    as: 'rant',
    onDelete: 'CASCADE',
});
//# sourceMappingURL=associations.js.map