import express from "express";
import messageController from "../controllers/messageController";

const router = express.Router();

router.get("/api", messageController.getMessages);
router.post("/api/create", messageController.createMessage);

export default router;
