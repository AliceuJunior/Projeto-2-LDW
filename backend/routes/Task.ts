import { Router } from "express";
import controller from "../controllers/TaskController";

const router = Router();

//router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.put("/", controller.updatenome);
router.put("/", controller.updatemail);

export default router;