import { Router } from "express";
import List from "./List";
import SubTasks from "./SubTasks";
import Task from "./Task";
import User from "./User";

const routes = Router();

routes.use("/list", List);
routes.use("/subtask", SubTasks);
routes.use("/task", Task);
routes.use("/user", User);

export default routes;