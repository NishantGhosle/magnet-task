import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getTaskList,
  getTaskById,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import {
  isAuth,
  authenticateUser,
  authenticate,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuth, createTask);
router.get("/", isAuth, getTasks);
router.put("/:id/status", isAuth, updateTaskStatus);
router.get("/taskList", authenticateUser, getTaskList);
router.get("/tasks/:id", authenticateUser, getTaskById);
router.delete("/tasks/:id", authenticate, deleteTask);
router.put("/tasks/:id", authenticate, updateTask);
export default router;
