import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receivedId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receivedId] },
    });

    // Create the conversation if it doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receivedId],
        message: [], // Ensure the array is initialized
      });
    }

    // Create the new message
    const newMessage = await Message.create({
      senderId,
      receivedId,
      message,
      conversationId: conversation._id,
    });

    // Initialize conversation.message if needed
    if (!conversation.message) {
      conversation.message = [];
    }

    // Add the new message ID to the conversation's message array
    conversation.message.push(newMessage._id);
    await conversation.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log('Error in sendMessage controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};