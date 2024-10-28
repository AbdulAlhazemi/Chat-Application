import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    massage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Massage',
        default: [],
      }
    ]

  }, { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;