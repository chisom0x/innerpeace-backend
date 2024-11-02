import { Op } from 'sequelize';
import UserEmotions from '../models/user_emotions_model';
import { subDays } from 'date-fns';

export class UserEmotionsService {
  static async addDailyEmotion(
    userId: number,
    emotionId: number,
    causeId: number
  ) {
    try {
      const newEmotion = await UserEmotions.create({
        userId: userId,
        emotionId: emotionId,
        causeId: causeId,
      });
      return newEmotion;
    } catch (error) {
      throw error;
    }
  }

  static async findCurrentWeekEmotion(userId: number) {
    const today = new Date();
    const oneWeekAgo = subDays(new Date(), 7);
    try {
      const records = await UserEmotions.findAll({
        where: {
          userId: userId,
          createdAt: {
            [Op.gte]: oneWeekAgo,
            [Op.lte]: today,
          },
        },
      });
      return records;
    } catch (error) {
      throw error;
    }
  }

  static async findAllEmotions(userId: number) {
    try {
      const recentRecords = await UserEmotions.findAll({
        where: { userId: userId },
        order: [['createdAt', 'DESC']], 
        limit: 30,
      });
  
      return recentRecords;
    } catch (error) {
      throw error;
    }
  }
  
}
