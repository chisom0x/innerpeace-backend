import Rant from '../models/rants_model';
import RantComment from '../models/rants_comments_model';

export default class rantsService {
  static async createRant(userId: number, name: string, text: string) {
    try {
      const rant = await Rant.create({
        userId,
        name,
        text,
      });
      return rant;
    } catch (error) {
      throw error;
    }
  }
  static async getRantById(id: number) {
    try {
      const rant = await Rant.findOne({
        where: { id },
        include: [
          {
            model: RantComment,
            as: 'comments', // Include associated comments
          },
        ],
      });
      if (!rant) {
        throw new Error('Rant not found');
      }
      return rant;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRant(id: number) {
    try {
      const rant = await Rant.findOne({ where: { id } });
      if (!rant) {
        throw new Error('Rant not found');
      }
      await rant.destroy();
      return { message: 'Rant deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  static async myRants(id: number) {
    try {
      const rant = await Rant.findAll({ where: { userId: id } });
      if (!rant) {
        throw new Error('Rant not found');
      }
      return rant;
    } catch (error) {
      throw error;
    }
  }
  static async createRantComment(
    userId: number,
    rantId: number,
    name: string,
    text: string
  ) {
    try {
      const rantComment = await RantComment.create({
        userId,
        rantId,
        name,
        text,
      });
      return rantComment;
    } catch (error) {
      throw error;
    }
  }
  static async deleteRantComment(id: number) {
    try {
      const rantComment = await RantComment.findOne({ where: { id } });
      if (!rantComment) {
        throw new Error('Rant comment not found');
      }
      await rantComment.destroy();
      return { message: 'Rant comment deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
  static async getAllRants() {
    try {
      const rants = await Rant.findAll();
      return rants;
    } catch (error) {
      throw error;
    }
  }
}
