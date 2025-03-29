import express from "express";
import messageController from "../controllers/messageController";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authMiddleware, authController.me);
router.get("/messages", messageController.getMessages);
router.post("/create", messageController.createMessage);
router.post("/delete", messageController.deleteMessage);
router.post("/update", messageController.updateMessage);

export default router;
