import { Request, Response } from "express";
import messageModel from "../models/messageModel";

export default {
  async getMessages(req: Request, res: Response): Promise<any> {
    try {
      const username = req.body.username;
      const messages = await messageModel.find({ username: username });
      if (messages.length === 0) {
        return res.status(200).json({
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
  async createMessage(req: Request, res: Response): Promise<any> {
    const username = req.body.username;
    const message = req.body.message;
    const timestamp = new Date().toDateString();
    try {
      if (message.length === 0 || message.length > 255) {
        return res.status(403).json({
          message: "Message cannot be empty or more than 255 characters",
          data: null,
        });
      }

      if (message.match(/^\s+$/)) {
        return res.status(403).json({
          message: "Message cannot be empty spaces",
          data: null,
        });
      }

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
