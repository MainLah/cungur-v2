import mongoose from "mongoose";

type Message = {
  message: string;
  timestamp: Date;
};

const Schema = mongoose.Schema;

const MessageSchema = new Schema<Message>({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
