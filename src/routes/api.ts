import express from "express";
import messageController from "../controllers/messageController";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/api/login", authController.login);
router.post("/api/register", authController.register);
router.get("/api/messages", messageController.getMessages);
router.post("/api/create", messageController.createMessage);

export default router;
