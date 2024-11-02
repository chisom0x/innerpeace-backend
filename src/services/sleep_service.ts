import Sleep from '../models/sleep_model';

export default class sleepService {
  static async createSleep(
    title: string,
    photo: string,
    audio: string,
    color: string
  ) {
    try {
      const newSleep = await Sleep.create({
        title: title,
        photo: photo,
        audio: audio,
        color: color,
      });

      return newSleep;
    } catch (error) {
      throw error;
    }
  }
  static async findAllSleep() {
    try {
      const sleep = await Sleep.findAll();
      return sleep;
    } catch (error) {
      throw error;
    }
  }
  static async findSleepById(id: number) {
    try {
      const sleep = await Sleep.findByPk(id);
      return sleep;
    } catch (error) {
      throw error;
    }
  }
  static async updateSleep(
    id: number,
    title: string,
    photo: string,
    audio: string,
    color: string
  ) {
    try {
      const sleep: any = await Sleep.findOne({ where: { id } });

      if (!sleep) {
        throw new Error('Sleep record not found');
      }

      sleep.title = title;
      sleep.photo = photo;
      sleep.audio = audio;
      sleep.color = color;

      const updatedSleep = await sleep.save();
      return updatedSleep;
    } catch (error) {
      throw error;
    }
  }
  static async deleteSleep(id: number) {
    try {
      const sleep = await Sleep.findOne({ where: { id } });

      if (!sleep) {
        throw new Error('Sleep record not found');
      }

      await sleep.destroy();
      return { message: 'Sleep record deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
