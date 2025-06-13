import { Request, Response } from "express";
import messageModel from "../models/messageModel";
import userModel from "../models/userModel";
import { IReqUser } from "../middlewares/authMiddleware";

export default {
  async getMessages(req: Request, res: Response): Promise<any> {
    try {
      let username: string | undefined;

      if (req.params.username) {
        username = req.params.username;
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          return res.status(400).json({
            message: "Invalid username",
            data: [],
          });
        }
      } else if ((req as IReqUser).user?.username) {
        username = (req as IReqUser).user?.username;
      } else {
        return res.status(400).json({
          message: "No username provided",
          data: [],
        });
      }

      const userExists = await userModel.findOne({ username });
      if (!userExists) {
        return res.status(403).json({
          message: "User does not exist",
          data: null,
        });
      }

      const messages = await messageModel.find({ username });

      if (messages.length === 0) {
        return res.status(200).json({
          message: "No messages found",
          data: [],
        });
      } else {
        console.log(messages);
        res.status(200).json({
          message: "Messages fetched successfully",
          data: messages,
        });
      }
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: [],
      });
    }
  },
  async createMessage(req: Request, res: Response): Promise<any> {
    let username: string | undefined;

    if (req.params.username) {
      username = req.params.username;
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return res.status(400).json({
          message: "Invalid username",
          data: [],
        });
      }
    } else if ((req as IReqUser).user?.username) {
      username = (req as IReqUser).user?.username;
    } else {
      return res.status(400).json({
        message: "No username provided",
        data: [],
      });
    }

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
        data: {
          id: newMessage._id,
          ...newMessage.toObject(),
        },
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
