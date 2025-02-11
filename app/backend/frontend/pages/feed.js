import React, { useState, useEffect } from "react";
import BooksList from "../components/bookslist/bookslist";
import Navbar from "../components/navbar/navbar";
import SubNavbar from "../components/subnavbar/subnavbar";
import Footer from "../components/footer/footer";
import ChatModal from "../components/chat/ChatModal";

export default function FeedPage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedPublicador, setSelectedPublicador] = useState(null);

    useEffect(() => {
        async function fetchSession() {
            try {
                const res = await fetch("/auth/status", {
                    credentials: "include",
                });
                const data = await res.json();
                if (data && data.user) {
                    setCurrentUser(data.user);
                }
            } catch (err) {
                console.error("Erro ao buscar dados da sessão", err);
            }
        }
        fetchSession();
    }, []);

    const openChatModal = (publicador) => {
        setSelectedPublicador(publicador);
        setChatOpen(true);
    };

    const activeFilter = (book) => book.status === "Ativo";

    return (
        <div>
            <Navbar />
            <SubNavbar />
            <BooksList
                endpoint="/books"
                filter={activeFilter}
                noDataText="Nenhum livro ativo encontrado."
                onOpenChat={openChatModal}
                currentUser={currentUser}
            />
            {currentUser && (
                <ChatModal
                    isOpen={chatOpen}
                    onClose={() => setChatOpen(false)}
                    currentUserId={currentUser.email}
                    selectedPublicador={selectedPublicador}
                />
            )}
            <Footer />
        </div>
    );
}