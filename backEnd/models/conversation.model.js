import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [ // Corrected 'massage' to 'messages'
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Corrected to 'Message'
        default: [],
      }
    ]
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;