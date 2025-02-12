import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from "./ChatModal.module.css";

let socket;

export default function ChatModal({ currentUserId, selectedPublicador, isOpen, onClose }) {
    const [activeChat, setActiveChat] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [conversations, setConversations] = useState({});
    const [inputText, setInputText] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        if (selectedPublicador && selectedPublicador.id !== currentUserId) {
            setActiveChat(selectedPublicador);
            setContacts(prev =>
                prev.some(contact => contact.id === selectedPublicador.id)
                    ? prev
                    : [...prev, selectedPublicador]
            );
        }
    }, [selectedPublicador, currentUserId]);

    useEffect(() => {
        if (!socket) {
            socket = io('http://localhost:3002', {
                withCredentials: true
            });
        }

        socket.emit("setUserId", currentUserId);

        socket.on("mensagemRecebida", (msg) => {
            const conversationId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;

            setConversations(prev => ({
                ...prev,
                [conversationId]: [...(prev[conversationId] || []), msg]
            }));

            const otherUser = {
                id: msg.senderId === currentUserId ? msg.receiverId : msg.senderId,
                name: msg.senderName || (msg.senderId === currentUserId ? msg.receiverId : msg.senderId)
            };

            if (otherUser.id !== currentUserId) {
                setContacts(prev =>
                    prev.some(contact => contact.id === otherUser.id)
                        ? prev
                        : [...prev, otherUser]
                );
            }
        });

        return () => {
            if (socket) {
                socket.off("mensagemRecebida");
            }
        };
    }, [currentUserId]);

    const sendMessage = () => {
        if (!inputText.trim() || !activeChat || activeChat.id === currentUserId) return;

        const message = {
            senderId: currentUserId,
            receiverId: activeChat.id,
            conteudo: inputText,
            senderName: currentUserId
        };

        socket.emit("mensagem", message);

        setConversations(prev => ({
            ...prev,
            [activeChat.id]: [...(prev[activeChat.id] || []), message]
        }));

        setInputText("");
    };

    const activeMessages = activeChat ? (conversations[activeChat.id] || []) : [];
    const filteredContacts = contacts.filter(contact => contact.id !== currentUserId);

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
                            {activeChat ? `Chat com ${activeChat.name}` : 'Conversas'}
                        </span>
                        <div>
                            {activeChat && (
                                <button
                                    className={styles.headerButton}
                                    onClick={() => setActiveChat(null)}
                                >
                                    Voltar
                                </button>
                            )}
                            <button
                                className={styles.headerButton}
                                onClick={() => setIsMinimized(true)}
                            >
                                −
                            </button>
                            <button
                                className={styles.headerButton}
                                onClick={onClose}
                            >
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
                                            onClick={() => setActiveChat(contact)}
                                        >
                                            {contact.name}
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
                                            className={
                                                msg.senderId === currentUserId
                                                    ? styles.myMessage
                                                    : styles.otherMessage
                                            }
                                        >
                                            {msg.conteudo}
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
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                sendMessage();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className={styles.sendButton}
                                    >
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