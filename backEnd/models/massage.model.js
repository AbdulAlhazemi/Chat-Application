import mongoose from "mongoose";

const massageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receivedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  massage: {
    type: String,
    required: true,
  }
}, {timestamps: true}
);

const Massage = mongoose.model("Massage", massageSchema);

export default Massage;