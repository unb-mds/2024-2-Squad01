import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./ChatModal.module.css";

export default function ChatModal({ currentUserId, selectedPublicador, isOpen, onClose }) {
    const [activeChat, setActiveChat] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [conversations, setConversations] = useState({});
    const [inputText, setInputText] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io("http://localhost:3002", { withCredentials: true });
        socketRef.current.emit("setUserId", currentUserId);

        socketRef.current.on("mensagemRecebida", (msg) => {
            const conversationKey =
                msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
            setConversations((prev) => ({
                ...prev,
                [conversationKey]: [...(prev[conversationKey] || []), msg],
            }));

            const otherId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
            if (otherId !== currentUserId) {
                const otherUser = {
                    id: otherId,
                    email: msg.senderId === currentUserId ? msg.receiverEmail : msg.senderEmail,
                };
                setContacts((prev) =>
                    prev.some((c) => c.id === otherId) ? prev : [...prev, otherUser]
                );
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [currentUserId]);

    useEffect(() => {
        if (selectedPublicador && selectedPublicador.id !== currentUserId) {
            console.log("selectedPublicador recebido:", JSON.stringify(selectedPublicador));
            setActiveChat(selectedPublicador);
            setContacts((prev) =>
                prev.some((contact) => contact.id === selectedPublicador.id)
                    ? prev
                    : [...prev, selectedPublicador]
            );
            // Utilize o campo correto: se não existir selectedPublicador.email, usa selectedPublicador.id ou userEmail
            loadConversation(selectedPublicador.email || selectedPublicador.id || selectedPublicador.userEmail);
        }
    }, [selectedPublicador, currentUserId]);

    const loadConversation = async (otherEmail) => {
        try {
            const response = await fetch(`/chat?user1=${currentUserId}&user2=${otherEmail}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                // Ensure each message has the correct structure
                const formattedMessages = data.map(msg => ({
                    senderId: msg.senderId || msg.senderEmail,
                    receiverId: msg.receiverId || msg.receiverEmail,
                    conteudo: msg.conteudo || msg.content, // Handle both possible field names
                    senderEmail: msg.senderEmail,
                    receiverEmail: msg.receiverEmail
                }));
                setConversations((prev) => ({
                    ...prev,
                    [otherEmail]: formattedMessages,
                }));
            } else {
                console.error("Erro ao carregar conversa");
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        }
    };

    const sendMessage = async () => {
        console.log("activeChat:", JSON.stringify(activeChat));
        if (!inputText.trim() || !activeChat) {
            return;
        }

        // Utilize a propriedade existente: se activeChat.email não existir, tenta activeChat.id ou activeChat.userEmail
        const receiverEmail = activeChat.email || activeChat.id || activeChat.userEmail;
        const messageData = {
            senderEmail: currentUserId,
            receiverEmail: receiverEmail,
            content: inputText,
        };

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(messageData),
            });
            if (response.ok) {
                setConversations((prev) => ({
                    ...prev,
                    [receiverEmail]: [
                        ...(prev[receiverEmail] || []),
                        {
                            senderId: currentUserId,
                            receiverId: activeChat.id,
                            conteudo: inputText,
                            senderEmail: currentUserId,
                            receiverEmail: receiverEmail,
                        },
                    ],
                }));
                socketRef.current.emit("mensagem", {
                    senderId: currentUserId,
                    receiverId: activeChat.id,
                    conteudo: inputText,
                    senderEmail: currentUserId,
                    receiverEmail: receiverEmail,
                });
                setInputText("");
            } else {
                console.error("Erro ao enviar mensagem via REST", response);
            }
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    };

    // Chave para acessar as mensagens ativas
    const activeMessages = activeChat ? conversations[activeChat.email || activeChat.id || activeChat.userEmail] || [] : [];
    const filteredContacts = contacts.filter((contact) => contact.id !== currentUserId);

    if (!isOpen) return null;

    return (
        <div className={styles.chatContainer}>
            {isMinimized ? (
                <div className={styles.chatIcon} onClick={() => setIsMinimized(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#FFF" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                </div>
            ) : (
                <div className={styles.chatBox}>
                    <div className={styles.chatHeader}>
                        <span>
                            {activeChat
                                ? `Chat com ${activeChat.name || activeChat.email || activeChat.id || activeChat.userEmail}`
                                : "Conversas"}
                        </span>
                        <div>
                            {activeChat && (
                                <button className={styles.headerButton} onClick={() => setActiveChat(null)}>
                                    Voltar
                                </button>
                            )}
                            <button className={styles.headerButton} onClick={() => setIsMinimized(true)}>
                                −
                            </button>
                            <button className={styles.headerButton} onClick={onClose}>
                                ×
                            </button>
                        </div>
                    </div>
                    <div className={styles.chatContent}>
                        {!activeChat ? (
                            <div className={styles.contactsList}>
                                {filteredContacts.length > 0 ? (
                                    filteredContacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className={styles.contactItem}
                                            onClick={() => {
                                                setActiveChat(contact);
                                                loadConversation(contact.email || contact.id || contact.userEmail);
                                            }}
                                        >
                                            {contact.name || contact.email || contact.id || contact.userEmail}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noContacts}>
                                        Nenhuma conversa ainda.
                                        <br />
                                        Inicie uma conversa clicando em "Conversar" em algum post!
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className={styles.chatMessages}>
                                    {activeMessages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={msg.senderId === currentUserId ? styles.myMessage : styles.otherMessage}
                                        >
                                            <div className={styles.messageContent}>
                                                {msg.conteudo || msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.inputArea}>
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Digite sua mensagem..."
                                        className={styles.input}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                sendMessage();
                                            }
                                        }}
                                    />
                                    <button onClick={sendMessage} className={styles.sendButton}>
                                        Enviar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}