import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receivedId } = req.params; // Changed to match schema
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receivedId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receivedId],
        messages: [],
      });
    }

    // Creating a new message with the correct `receivedId`
    const newMessage = await Message.create({
      senderId,
      receivedId, // Updated to `receivedId` to match schema
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log('Error in sendMessage controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};