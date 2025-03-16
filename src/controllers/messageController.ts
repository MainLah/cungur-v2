import { Request, Response } from 'express';

export default {
    async getMessages(req: Request, res: Response) {
        res.send('GET request');
    },
    async createMessage(req: Request, res: Response) {
        res.send('POST request');
    }
}

