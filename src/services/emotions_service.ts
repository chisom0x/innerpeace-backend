import Emotion from '../models/emotions_model.ts';
import EmotionCause from '../models/emotion_cause_model.ts';

export default class EmotionService {
  static async createEmotion(emotion: string, photo: string) {
    try {
      const newEmotion = await Emotion.create({
        emotion: emotion,
        photo: photo,
      });
      return newEmotion;
    } catch (error) {
      throw error;
    }
  }
  static async findAllEmotions() {
    try {
      const emotions = await Emotion.findAll();
      return emotions;
    } catch (error) {
      throw error;
    }
  }
  static async findOneEmotion(emotionId: any) {
    try {
      const emotion = await Emotion.findByPk(emotionId);
      return emotion;
    } catch (error) {
      throw error;
    }
  }
  static async createEmotionCause(cause: string) {
    try {
      const emotionCause = await EmotionCause.create({ cause: cause });
      return emotionCause;
    } catch (error) {
      throw error;
    }
  }
  static async findOneEmotionCause(causeId: any) {
    try {
      const cause = await EmotionCause.findByPk(causeId);
      return cause;
    } catch (error) {
      throw error;
    }
  }
  static async findAllEmotionCauses() {
    try {
      const emotions = await EmotionCause.findAll();
      return emotions;
    } catch (error) {
      throw error;
    }
  }
}
