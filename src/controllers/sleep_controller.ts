import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app_error';
import { successResponse } from '../utils/response';
import sleepService from '../services/sleep_service';
import {
  uploadAudioBufferToCloudinary,
  uploadPhotoBufferToCloudinary,
} from '../utils/cloudinary_upload';

export default class sleepController {
  static async addSleep(req: Request, res: Response, next: NextFunction) {
    const { title, color } = req.body;
    const { photo, audio } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    if (!title) return next(new AppError('please provide a title!', 400));
    if (!color) return next(new AppError('please provide a color!', 400));
    if (!photo || !photo[0])
      return next(new AppError('Please provide a photo!', 400));
    if (!audio || !audio[0])
      return next(new AppError('Please provide an audio file!', 400));

    try {
      const photoUrl = await uploadPhotoBufferToCloudinary(photo[0].buffer);
      const audioUrl = await uploadAudioBufferToCloudinary(audio[0].buffer);

      await sleepService.createSleep(title, photoUrl, audioUrl, color);

      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getAllSleepSounds(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let soundsArr: any[] = [];
      const sleepSounds = await sleepService.findAllSleep();
      for (const sound of sleepSounds) {
        soundsArr.push({
          title: sound?.get('title'),
          photo: sound?.get('photo'),
          audio: sound?.get('audio'),
          color: sound?.get('color'),
        });
      }
      return successResponse(res, soundsArr);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getSleepSoundById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const soundId = req.params.soundId;
    console.log(soundId);
    const convSoundId = parseInt(soundId);
    try {
      const sleepSound = await sleepService.findSleepById(convSoundId);
      return successResponse(res, sleepSound);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async updateSleepSound(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const soundId = req.params.soundId;
    if (!soundId) return next(new AppError('please provide an id!', 400));
    const { title, color } = req.body;
    try {
      const { photo, audio } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      const photoUrl = await uploadPhotoBufferToCloudinary(photo[0].buffer);
      const audioUrl = await uploadAudioBufferToCloudinary(audio[0].buffer);

      await sleepService.updateSleep(
        parseInt(soundId),
        title,
        photoUrl,
        audioUrl,
        color
      );

      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async deleteSleepSound(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const soundId = req.params.soundId;
    try {
      await sleepService.deleteSleep(parseInt(soundId));
      return successResponse(res, null);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
