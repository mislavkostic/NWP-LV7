import { UserInput, userModel } from "../../models/userModel";
import { getMongoErrors } from "../../utils/errorHandlers";

class UserRepository {
  static async save(user: UserInput) {
    try {
      return await userModel.create(user);
    } catch (error) {
      return getMongoErrors(error);
    }
  }

  static async getUserByEmail(email: string) {
    return await userModel.findOne({ email });
  }

  static async getUserById(id: string) {
    return await userModel.findOne({ _id: id });
  }

  static async getAllUsers() {
    return await userModel.find({});
  }
}

export = UserRepository;
