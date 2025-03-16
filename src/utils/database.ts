import mongoose from 'mongoose';
import { DB_URL } from './env';

export const connectDb = async () => {
    try {
        await mongoose.connect(DB_URL, {
            dbName: 'cungur-db'
        })
        return Promise.resolve('Successfully connected to the database');
    }
    catch(error) {
        return Promise.reject(error);
    }
}