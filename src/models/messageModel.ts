import mongoose from "mongoose";

type Message = {
  username: string;
  message: string;
  timestamp: Date;
};

const Schema = mongoose.Schema;

const MessageSchema = new Schema<Message>({
  username: { type: String, required: true, default: "Error getting username" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
