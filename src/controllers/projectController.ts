import { NextFunction, Request, Response } from "express";
import ProjectRepository from "../db/repositories/projectRepository";
import UserRepository from "../db/repositories/userRepository";
import Helpers from "../utils/helpers";

class ProjectController {
  //method or getting all projects from db
  static async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      //getting projects
      const projects = await ProjectRepository.getAllProjects();
      //rendering view with fetched data
      res.render("index", { projects, title: "All projects" });
    } catch (error) {
      //if there is an error, show it in console
      next(error);
    }
  }
  //method for getting single project by id
  static async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      //getting project
      const project = await ProjectRepository.getProjectById(req.params.id);
      //rendering view with fetched data
      res.render("project", { project, title: "Project details" });
    } catch (error) {
      next(error);
    }
  }
  //method for rendering view that contains form for adding new project
  static async getProjectForm(req: Request, res: Response) {
    const users = await UserRepository.getAllUsers();
    return res.render("addProject", { title: "Add project", users });
  }
  //method for adding new project to database
  static async addProject(req: Request, res: Response, next: NextFunction) {
    //data sent via request
    const data = req.body;
    console.log(data);
    try {
      const { id } = Helpers.getCurrentUserData(req)!;
      //saving data
      data.leaderId = id;
      await ProjectRepository.save(data);
      //redirecting to home page(page that shows all projects)
      return res.redirect("/");
    } catch (error: any) {
      //if there is an error, send it
      next(error);
    }
  }
  //method for deleting project by Id
  static async deleteProject(req: Request, res: Response, next: NextFunction) {
    //getting id from query parameters
    const { id } = req.params;
    try {
      //deleteing project
      await ProjectRepository.delete(id);
      res.json({ redirect: "/" });
    } catch (error) {
      next(error);
    }
  }
  //method for rendering view that contains form for updating project
  static async getUpdateForm(req: Request, res: Response, next: NextFunction) {
    //getting id from query parameters
    const { id } = req.params;

    try {
      const users = await UserRepository.getAllUsers();
      //getting project data so we can render it in the view
      const project = await ProjectRepository.getProjectById(id);
      // rendering data to the view
      res.render("updateProject", { project, users, title: "Update project" });
    } catch (error) {
      next(error);
    }
  }
  //method for updating project
  static async updateProject(req: Request, res: Response, next: NextFunction) {
    //getting id from query parameters
    const { id } = req.params;
    //data sent via request
    const data = req.body;

    try {
      //updating project with provided data
      await ProjectRepository.update(id, data);
      //redirecting
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async getProjectsWhereUserIsLeader(req: Request, res: Response, next: NextFunction) {
    const { id } = Helpers.getCurrentUserData(req)!;
    try {
      const projects = await ProjectRepository.getProjectsByLeaderId(id);
      res.render("myProjects", { projects, title: "Leader Projects" });
    } catch (error) {
      return next(error);
    }
  }

  static async getProjectsWhereUserIsMember(req: Request, res: Response, next: NextFunction) {
    const { id } = Helpers.getCurrentUserData(req)!;
    try {
      const projects = await ProjectRepository.getMemberProjects(id);
      res.render("projectMember", { projects, title: "Member Projects" });
    } catch (error) {
      return next(error);
    }
  }

  static async archiveProject(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const project = await ProjectRepository.getProjectById(id);
      project!.archived = true;
      project?.save();
      res.redirect("/archived");
    } catch (error) {
      return next(error);
    }
  }

  static async getArchivedView(req: Request, res: Response, next: NextFunction) {
    const { id } = Helpers.getCurrentUserData(req)!;
    const projects = await ProjectRepository.getArchivedProjects(id);
    return res.render("archived", { projects, title: "Archived Projects" });
  }
}

export = ProjectController;
