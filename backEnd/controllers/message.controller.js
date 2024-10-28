export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    })

    if (!conversation) {
      conversation.create({
        participant: [senderId, receiverId],
      })
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    res.status(201).json({ message: "Message sent successfully" })

  } catch (error) {
    console.log('Error in sendMssage controller:', error);
    res.status(500).json({ error: 'internal server Error' });
  }
}