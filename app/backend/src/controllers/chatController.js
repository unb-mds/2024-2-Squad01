import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const sendMessage = async (req, res) => {
    console.log("chatController.sendMessage - req.body:", req.body);
    const { senderEmail, receiverEmail, content } = req.body;
    if (!senderEmail || !receiverEmail || !content) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const newMessage = await prisma.chat.create({
            data: {
                content,
                senderEmail,
                receiverEmail,
            }
        });
        return res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating chat message:", error);
        return res.status(500).json({ error: "Error creating chat message" });
    }
};

export const getMessages = async (req, res) => {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
        return res.status(400).json({ error: "Missing user query parameters" });
    }
    try {
        const messages = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderEmail: user1, receiverEmail: user2 },
                    { senderEmail: user2, receiverEmail: user1 }
                ]
            },
            orderBy: { initDate: 'asc' }
        });
        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Error fetching messages" });
    }
};