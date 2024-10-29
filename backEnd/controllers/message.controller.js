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


export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages")

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server erorr" });
  }
} 