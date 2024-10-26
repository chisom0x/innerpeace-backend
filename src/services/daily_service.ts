import { threadId } from 'worker_threads';
import Daily from '../models/daily_model';

export default class dailyService {
  static async createDaily(time: string, audio: string) {
    try {
      const daily = await Daily.create({
        time: time,
        audio: audio,
      });
      return daily;
    } catch (error) {
      throw error;
    }
  }
  static async findDailyByTime(time: string) {
    try {
      const daily = await Daily.findOne({ where: { time: time } });
      return daily;
    } catch (error) {
      throw error;
    }
  }
  static async findDailyById(id: number) {
    try {
      const daily = await Daily.findByPk(id);
      return daily;
    } catch (error) {
      throw error;
    }
  }

  static async updateDaily(id: number, time: string, audio: string) {
    try {
      const daily: any = await Daily.findOne({ where: { id } });

      if (!daily) {
        throw new Error('daily record not found');
      }

      daily.time = time;
      daily.audio = audio;

      const updatedDaily = await daily.save();
      return updatedDaily;
    } catch (error) {
      throw error;
    }
  }
}
