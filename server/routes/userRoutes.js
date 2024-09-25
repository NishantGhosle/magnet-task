import express from "express";
import {
  signup,
  login,
  getUserProfile,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userprofile", authenticateUser, getUserProfile);

export default router;
