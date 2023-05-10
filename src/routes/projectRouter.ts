import express from "express";
import ProjectController from "../controllers/projectController";
import methodOverride from "method-override";
import Helpers from "../utils/helpers";
import { requireAuthentication, checkUser } from "../middlewares/authMiddleware";
//router for all project routes
const projectRouter = express.Router();

projectRouter.use(methodOverride(Helpers.checkMethod));
projectRouter.get("*", checkUser);
//route for rendering view wih all projects
projectRouter.get("/", ProjectController.getAllProjects);
//route for getting view with single project details
projectRouter.get("/project/:id", requireAuthentication, ProjectController.getProject);
//route for getting view  that contains form for adding new project
projectRouter.get("/addProject", ProjectController.getProjectForm);
//route for adding new project
projectRouter.post("/", ProjectController.addProject);
//route for deleting project
projectRouter.delete("/project/:id", ProjectController.deleteProject);
//route for getting view that contains form for updating project
projectRouter.get("/project/update/:id", ProjectController.getUpdateForm);
//route for updating project
projectRouter.put("/project/update/:id", ProjectController.updateProject);

projectRouter.get("/my", ProjectController.getProjectsWhereUserIsLeader);
projectRouter.get("/member", ProjectController.getProjectsWhereUserIsMember);
projectRouter.get("/archive/:id", ProjectController.archiveProject);

projectRouter.get("/archived", ProjectController.getArchivedView);
export = projectRouter;
