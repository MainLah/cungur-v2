import express from "express";
import messageController from "../controllers/messageController";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/logout", authController.logout);
// router.get("/auth/me", authMiddleware, authController.me);
router.get("/messages", authMiddleware, messageController.getMessages);
router.post("/create", authMiddleware, messageController.createMessage);
router.delete("/delete", messageController.deleteMessage);
router.patch("/update", messageController.updateMessage);

export default router;
