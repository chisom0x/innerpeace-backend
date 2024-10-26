import UserEmotions from './user_emotions_model.ts';
import User from './user_model.ts';
import Emotion from './emotions_model.ts';
import EmotionCause from './emotion_cause_model.ts';
import Meditation from './meditation_model.ts';
import MeditationTopic from '../services/meditation_topics_model.ts';
import Rant from './rants_model.ts'; 
import RantComment from './rants_comments_model.ts';  

// Many UserEmotions for one User
UserEmotions.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Many UserEmotions for one Emotion
UserEmotions.belongsTo(Emotion, {
  foreignKey: 'emotionId',
  onDelete: 'CASCADE',
});

// Many UserEmotions for one EmotionCause
UserEmotions.belongsTo(EmotionCause, {
  foreignKey: 'causeId',
  onDelete: 'CASCADE',
});

// One User has many UserEmotions
User.hasMany(UserEmotions, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// One Emotion has many UserEmotions
Emotion.hasMany(UserEmotions, {
  foreignKey: 'emotionId',
  onDelete: 'CASCADE',
});

// One EmotionCause has many UserEmotions
EmotionCause.hasMany(UserEmotions, {
  foreignKey: 'causeId',
  onDelete: 'CASCADE',
});

// One Meditation has many MeditationTopics
Meditation.hasMany(MeditationTopic, {
  foreignKey: 'meditationId',
  as: 'topics', 
});

// Many MeditationTopics belong to one Meditation
MeditationTopic.belongsTo(Meditation, {
  foreignKey: 'meditationId',
  as: 'meditation', 
});

// One Rant has many RantComments
Rant.hasMany(RantComment, {
  foreignKey: 'rantId',
  as: 'comments',
  onDelete: 'CASCADE',
});

// Many RantComments belong to one Rant
RantComment.belongsTo(Rant, {
  foreignKey: 'rantId',
  as: 'rant',
  onDelete: 'CASCADE',
});
