import { Request, Response } from "express";
import messageModel from "../models/messageModel";

export default {
  async getMessages(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const messages = await messageModel.find({ username: username });
      if (messages.length === 0) {
        res.status(200).json({
          message: "No messages found",
          data: [],
        });
      } else {
        res.status(200).json({
          message: "Messages fetched successfully",
          data: messages,
        });
      }
    } catch (error) {
      res.status(403).json({
        message: "Error fetching messages",
        data: null,
      });
    }
  },
  async createMessage(req: Request, res: Response) {
    const username = req.body.username;
    const message = req.body.message;
    const timestamp = new Date().toDateString();
    try {
      const newMessage = await messageModel.create({
        username,
        message,
        timestamp,
      });
      res.status(200).json({
        message: "Message created successfully",
        data: newMessage,
      });
    } catch (error) {
      res.status(403).json({
        message: "Error creating message",
        data: null,
      });
    }
  },
};
