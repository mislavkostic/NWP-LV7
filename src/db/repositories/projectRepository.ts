import { ProjectInput, projectModel } from "../../models/projectModel";
import { getMongoErrors } from "../../utils/errorHandlers";

class ProjectRepository {
  //method for saving project to database
  static async save(project: ProjectInput) {
    try {
      //saving new document to the database
      return await projectModel.create(project);
    } catch (error) {
      //catch errors (if some data is missing or has bad format)
      return getMongoErrors(error);
    }
  }
  //method for getting all records(documents) from db
  static async getAllProjects() {
    return await projectModel.find({});
  }
  //method for getting single project by Id
  static async getProjectById(id: string) {
    return await projectModel.findById(id).populate("members", { firstName: 1, lastName: 1 });
  }
  //method for deleting project by Id
  static async delete(id: string) {
    return await projectModel.findByIdAndDelete(id);
  }
  //method for updating project by Id
  static async update(id: string, data: ProjectInput) {
    return await projectModel.findByIdAndUpdate(id, data);
  }

  static async getProjectsByLeaderId(userId: string) {
    return await projectModel.find({ leaderId: userId, archived: false });
  }

  static async getMemberProjects(userId: string) {
    return await projectModel.find({ members: userId, archived: false });
  }

  static async getArchivedProjects(userId: string) {
    return await projectModel.find({ $or: [{ members: userId }, { leaderId: userId }], $and: [{ archived: true }] });
  }
}

export = ProjectRepository;
