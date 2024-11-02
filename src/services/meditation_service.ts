import Meditation from '../models/meditation_model';
import MeditationTopic from '../models/meditation_topics_model';

export default class meditationService {
  static async createMeditation(
    title: string,
    description: string,
    photo: string
  ) {
    try {
      const meditation = await Meditation.create({
        title: title,
        description: description,
        photo: photo,
      });
      return meditation;
    } catch (error) {
      throw error;
    }
  }
  static async findMeditationById(id: number) {
    try {
      const meditation = await Meditation.findByPk(id);
      return meditation;
    } catch (error) {
      throw error;
    }
  }
  static async findMeditations() {
    try {
      const meditation = await Meditation.findAll();
      return meditation;
    } catch (error) {
      throw error;
    }
  }
  static async createMeditationTopic(
    meditationId: number,
    title: string,
    audio: string
  ) {
    try {
      const meditationTopic = await MeditationTopic.create({
        meditationId: meditationId,
        title: title,
        audio: audio,
      });
      return meditationTopic;
    } catch (error) {
      throw error;
    }
  }
  static async findAllTopicsByMeditationId(meditationId: number) {
    try {
      const topics = await MeditationTopic.findAll({
        where: {
          meditationId: meditationId,
        },
      });
      return topics;
    } catch (error) {
      throw error;
    }
  }
  static async findMeditationTopicById(id: number) {
    try {
      const meditationTopic = await MeditationTopic.findByPk(id);
      return meditationTopic;
    } catch (error) {
      throw error;
    }
  }
}
