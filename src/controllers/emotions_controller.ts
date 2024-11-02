import EmotionService from '../services/emotions_service';
import { NextFunction, Request, Response } from 'express';
import { format } from 'date-fns';
import AppError from '../utils/app_error';
import { successResponse } from '../utils/response';
import LoggedInUser from '../utils/logged_in_user';
import { UserEmotionsService } from '../services/user_emotions_service';

export default class EmotionsController {
  static async addEmotion(req: Request, res: Response, next: NextFunction) {
    const { emotion, photo } = req.body;
    if (!emotion) return next(new AppError('please enter an emotion!', 400));
    if (!photo) return next(new AppError('please enter a photo!', 400));
    try {
      const newEmotion = await EmotionService.createEmotion(emotion, photo);
      return successResponse(res, newEmotion);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getEmotions(req: Request, res: Response, next: NextFunction) {
    try {
      const emotions = await EmotionService.findAllEmotions();
      return successResponse(res, emotions);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async addEmotionCauses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { cause } = req.body;
    if (!cause)
      return next(new AppError('please enter an emotion cause!', 400));
    try {
      const emotionCause = await EmotionService.createEmotionCause(cause);
      return successResponse(res, emotionCause);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getEmotionCauses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const emotionCauses = await EmotionService.findAllEmotionCauses();
      return successResponse(res, emotionCauses);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async addDailyEmotion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { emotionId, causeId } = req.body;
    if (!emotionId) return next(new AppError('please select an emotion!', 400));
    if (!causeId) return next(new AppError('please select a cause!', 400));
    try {
      const userId = await LoggedInUser.getLoggedInUser(req, res);
      if (userId === 'not-logged-in')
        return next(new AppError('please login!', 400));
      await UserEmotionsService.addDailyEmotion(userId, emotionId, causeId);
      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getCurrentWeekEmotion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = await LoggedInUser.getLoggedInUser(req, res);
      const records = await UserEmotionsService.findCurrentWeekEmotion(userId);
      let recordsArr: any[] = [];

      for (const record of records) {
        const date = new Date(record.get('createdAt') as string);
        const dayOfWeek = format(date, 'EEEE');
        const emotion = await EmotionService.findOneEmotion(
          record.get('emotionId')
        );
        const cause = await EmotionService.findOneEmotionCause(
          record.get('userId')
        );
        recordsArr.push({
          emotion: emotion?.get('emotion'),
          cause: cause?.get('cause'),
          day: dayOfWeek,
        });
      }

      return successResponse(res, recordsArr);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getUserEmotions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = await LoggedInUser.getLoggedInUser(req, res);
      const records = await UserEmotionsService.findAllEmotions(userId);
      let recordsArr: any[] = [];

      for (const record of records) {
        const date = new Date(record.get('createdAt') as string);
        const formattedDate = format(date, 'd/MM/yyyy');
        const emotion = await EmotionService.findOneEmotion(
          record.get('emotionId')
        );
        const cause = await EmotionService.findOneEmotionCause(
          record.get('userId')
        );
        recordsArr.push({
          emotion: emotion?.get('emotion'),
          cause: cause?.get('cause'),
          day: formattedDate,
        });
      }

      return successResponse(res, recordsArr);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  
}
