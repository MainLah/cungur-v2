import express from "express";
import messageController from "../controllers/messageController";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/messages", messageController.getMessages);
router.post("/create", messageController.createMessage);
router.post("/delete", messageController.deleteMessage);

export default router;
