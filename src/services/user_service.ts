import User from '../models/user_model';

export default class UserService {
  static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    try {
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }

  static async findUserByEmail(email: string) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
