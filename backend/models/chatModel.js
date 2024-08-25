import mongoose, { mongo } from "mongoose";

const chatSchema = mongoose.Schema({
  username: String,
  message: String,
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
