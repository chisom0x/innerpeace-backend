import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app_error.ts';
import { successResponse } from '../utils/response.ts';
import rantsService from '../services/rants_service.ts';

export default class RantController {
  
  static async addRant(req: Request, res: Response, next: NextFunction) {
    const { userId, name, text } = req.body;

    if (!userId) return next(new AppError('Please provide a userId!', 400));
    if (!name) return next(new AppError('Please provide a name!', 400));
    if (!text) return next(new AppError('Please provide a rant text!', 400));

    try {
     await rantsService.createRant(userId, name, text);
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllRants(req: Request, res: Response, next: NextFunction) {
    try {
      const rants = await rantsService.getAllRants();
      return successResponse(res, rants);
    } catch (error) {
      return next(error);
    }
  }

  static async getRantById(req: Request, res: Response, next: NextFunction) {
    const rantId = req.params.rantId;

    try {
      const rant = await rantsService.getRantById(parseInt(rantId));
      return successResponse(res, rant);
    } catch (error) {
      return next(error);
    }
  }

  static async getUserRants(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId
    try {
      const rant = await rantsService.myRants(parseInt(userId));
      return successResponse(res, rant);
    } catch (error) {
      return next(error);
    }
  }

  static async addRantComment(req: Request, res: Response, next: NextFunction) {
    const { userId, name, text } = req.body;
    const rantId = req.params.rantId

    if (!userId) return next(new AppError('Please provide a userId!', 400));
    if (!rantId) return next(new AppError('Please provide a rantId!', 400));
    if (!name) return next(new AppError('Please provide a name!', 400));
    if (!text) return next(new AppError('Please provide a comment text!', 400));

    try {
       await rantsService.createRantComment(userId, parseInt(rantId), name, text);
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteRant(req: Request, res: Response, next: NextFunction) {
    const rantId = req.params.rantId;

    try {
      await rantsService.deleteRant(parseInt(rantId));
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteRantComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;

    try {
      await rantsService.deleteRantComment(parseInt(commentId));
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }
}
