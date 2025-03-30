import { Request, Response } from "express";
import messageModel from "../models/messageModel";
import { IReqUser } from "../middlewares/authMiddleware";
import UserModel from "../models/userModel";

export default {
  async getMessages(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserModel.findOne({
        _id: (req as IReqUser).user?.id,
      });
      const messages = await messageModel.find({ username: user?.username });

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
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
  async createMessage(req: Request, res: Response): Promise<any> {
    const user = await UserModel.findOne({
      _id: (req as IReqUser).user?.id,
    });
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
        username: user?.username,
        message,
        timestamp,
      });
      res.status(200).json({
        message: "Message created successfully",
        data: newMessage,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
  async deleteMessage(req: Request, res: Response): Promise<any> {
    const messageId = req.body._id;

    try {
      const message = await messageModel.findByIdAndDelete(messageId);
      if (!message) {
        return res.status(403).json({
          message: "Message not found",
          data: null,
        });
      }

      res.status(200).json({
        message: "Message deleted",
        data: message,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
  async updateMessage(req: Request, res: Response): Promise<any> {
    const messageId = req.body._id;
    const newMessage = req.body.newMessage;

    try {
      if (newMessage.length === 0 || newMessage.length > 255) {
        return res.status(403).json({
          message: "Message cannot be empty or more than 255 characters",
          data: null,
        });
      }

      if (newMessage.match(/^\s+$/)) {
        return res.status(403).json({
          message: "Message cannot be empty spaces",
          data: null,
        });
      }

      const update = await messageModel.findByIdAndUpdate(
        messageId,
        { message: newMessage },
        { new: true }
      );
      if (!update) {
        return res.status(403).json({
          message: "Error updating message",
          data: null,
        });
      }
      res.status(200).json({
        message: "Message updated",
        data: update,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
};
