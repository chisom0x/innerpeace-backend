import {
  uploadAudioBufferToCloudinary
} from '../utils/cloudinary_upload.ts';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app_error.ts';
import { successResponse } from '../utils/response.ts';
import dailyService from '../services/daily_service.ts';

export default class dailyController {
  static async addDaily(req: Request, res: Response, next: NextFunction) {
    const { time } = req.body;
    const audio = req.file;

    if (!time) return next(new AppError('please provide a time!', 400));
    if (!audio) return next(new AppError('please provide a audio!', 400));

    try {
      const audioUrl = await uploadAudioBufferToCloudinary(audio.buffer);
      await dailyService.createDaily(time, audioUrl);
      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getDailyByTime(req: Request, res: Response, next: NextFunction) {
    const time = req.query.time as string;
    if (!time) return next(new AppError('please provide a time!', 400));

    try {
      const daily = await dailyService.findDailyByTime(time);
      return successResponse(res, daily);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getDailyById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.dailyId;
    if (!id) return next(new AppError('please provide a id!', 400));
    try {
      const daily = await dailyService.findDailyById(parseInt(id));
      return successResponse(res, daily);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async updateDaily(req: Request, res: Response, next: NextFunction) {
    const dailyId = req.params.dailyId;
    const { time } = req.body;
    const audio = req.file;

    if (!dailyId) return next(new AppError('Please provide an ID!', 400));
    if (!time) return next(new AppError('Please provide a time!', 400));
    if (!audio) return next(new AppError('Please provide an audio!', 400));

    try {
      const audioUrl = await uploadAudioBufferToCloudinary(audio.buffer);
     
      const updatedDaily = await dailyService.updateDaily(
        parseInt(dailyId),
        time,
        audioUrl
      );

      return successResponse(res, updatedDaily);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
