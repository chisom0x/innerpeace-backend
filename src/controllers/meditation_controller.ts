import {
  uploadAudioBufferToCloudinary,
  uploadPhotoBufferToCloudinary,
} from '../utils/cloudinary_upload.ts';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app_error.ts';
import { successResponse } from '../utils/response.ts';
import meditationService from '../services/meditation_service.ts';

export default class meditationController {
  static async addMeditation(req: Request, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    const photo = req.file;

    if (!title) return next(new AppError('please provide a title!', 400));
    if (!description)
      return next(new AppError('please provide a description!', 400));
    if (!photo) return next(new AppError('please provide a photo!', 400));

    try {
      const photoUrl = await uploadPhotoBufferToCloudinary(photo.buffer);
      await meditationService.createMeditation(title, description, photoUrl);
      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  static async getAllMeditation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const meditation = await meditationService.findMeditations();
      return successResponse(res, meditation);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  static async getMeditationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const meditationId = req.params.meditationId;
    try {
      const meditation = await meditationService.findMeditationById(
        parseInt(meditationId)
      );
      const topics = await meditationService.findAllTopicsByMeditationId(
        parseInt(meditationId)
      );
      const data = {
        description: meditation?.get('description'),
        topics: topics,
      };
      return successResponse(res, data);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  static async addMeditationTopic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const meditationId = req.params.meditationId;
    const { title } = req.body;
    const audio = req.file;

    if (!meditationId)
      return next(new AppError('please provide a meditationId!', 400));
    if (!title) return next(new AppError('please provide a title!', 400));
    if (!audio) return next(new AppError('please provide a time!', 400));

    try {
      const audioUrl = await uploadAudioBufferToCloudinary(audio.buffer);
      await meditationService.createMeditationTopic(
        parseInt(meditationId),
        title,
        audioUrl
      );
      return successResponse(res, null)
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  static async getMeditationTopicById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const meditationId = req.params.meditationId;
    try {
      const meditation = await meditationService.findMeditationTopicById(
        parseInt(meditationId)
      );
      return successResponse(res, meditation);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
