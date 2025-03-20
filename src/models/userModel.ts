import mongoose from "mongoose";
import { encrypt } from "../utils/encrypt";

type User = {
  username: string;
  password: string;
};

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
