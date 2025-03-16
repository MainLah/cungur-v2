import { Request, Response } from 'express';
import messageModel from '../models/messageModel';

export default {
    async getMessages(req: Request, res: Response) {
        try {
            const messages = await messageModel.find();
            res.status(200).json({
                message: 'Messages fetched successfully',
                data: messages
            })
        }
        catch (error) {
            res.status(403).json({
                message: 'Error fetching messages',
                data: null
            })
        }
    },
    async createMessage(req: Request, res: Response) {
        const message = req.body.message;
        const timestamp = new Date().toDateString();
        try {
            const newMessage = await messageModel.create({ message, timestamp });
            res.status(200).json({
                message: 'Message created successfully',
                data: newMessage
            })
        }
        catch (error) {
            res.status(403).json({
                message: 'Error creating message',
                data: null
            })
        }
    }
}

