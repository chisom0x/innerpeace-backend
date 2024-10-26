import UserService from '../services/user_service.ts';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AppError from '../utils/app_error.ts';
import createSendToken from '../utils/jwt_helper.ts';
import { successResponse } from '../utils/response.ts';

export default class Authentication {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body;
    try {
      if (!firstName)
        return next(new AppError('Please enter your first name!', 400));
      if (!lastName)
        return next(new AppError('please enter your lastname!', 400));
      if (!email)
        return next(new AppError('please enter your email address!', 400));
      if (!password) return next(new AppError('please set a password!', 400));

      //validate email!

      const userExists = await UserService.findUserByEmail(email);

      if (userExists) return next(new AppError('email already in use!', 400));

      const user = await UserService.createUser(
        firstName,
        lastName,
        email,
        password
      );
      return createSendToken(user, 200, res);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email)
      return next(new AppError('please enter your email address', 400));
    if (!password) return next(new AppError('please enter a password', 400));

    try {
      const user: any = await UserService.findUserByEmail(email);

      let userPass = !user ? 'no_user' : (user.password as string);
      const pass = await bcrypt.compare(password, userPass);

      if (user && pass) return createSendToken(user, 200, res);
      return next(new AppError('incorrect email or password!', 400));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
