import { useState, useEffect } from "react";
import styles from "./bookslist.module.css";

export default function BooksList({ endpoint, filter, noDataText, onOpenChat, currentUser, allowDelete }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedBook, setExpandedBook] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch(endpoint, { credentials: "include" });
                if (response.ok) {
                    let data = await response.json();
                    if (filter) data = data.filter(filter);
                    setBooks(Array.isArray(data) ? data : []);
                } else {
                    console.error("Erro ao buscar livros:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, [endpoint, filter]);

    const handleChatClick = (book) => {
        if (!book.email_publicador || !book.username) {
            console.error("Dados do publicador não encontrados:", book);
            return;
        }
        if (book.email_publicador === currentUser?.email) {
            return;
        }
        onOpenChat({
            id: book.email_publicador,
            name: book.username
        });
    };

    const handleDelete = async (bookId) => {
        if (!window.confirm("Tem certeza que deseja deletar este livro?")) {
            return;
        }
        try {
            const response = await fetch(`/books/${bookId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.ok) {
                setBooks(books.filter(book => book.id !== bookId));
            } else {
                console.error("Erro ao deletar livro", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição de deleção", error);
        }
    };

    if (loading) {
        return <div className={styles.centered}>Carregando...</div>;
    }
    if (!books.length) {
        return <p className={styles.centered}>{noDataText || "Nenhum livro encontrado."}</p>;
    }

    return (
        <div className={styles["books-list"]}>
            {books.map((book) => (
                <div key={book.id} className={styles["book-card"]}>
                    <div className={styles.header}>
                        <img
                            className={styles["user-photo"]}
                            src={
                                book.userPhoto && book.userPhoto.startsWith("http")
                                    ? book.userPhoto
                                    : `/uploads/profile-photos/${book.userPhoto || "default-avatar.png"}`
                            }
                            alt={book.username || "Usuário"}
                        />
                        <span className={styles["user-name"]}>
                            {book.username || "Usuário Desconhecido"}
                        </span>
                    </div>

                    {book.foto ? (
                        <img
                            className={styles["book-image"]}
                            src={book.foto.startsWith("http") ? book.foto : `/uploads/${book.foto}`}
                            alt={book.nome}
                        />
                    ) : (
                        <div className={styles["empty-book-image"]} />
                    )}

                    <h3 className={styles["book-title"]}>{book.nome}</h3>
                    <p className={styles["book-objective"]}>
                        <strong>Objetivo:</strong> {book.objetivo}
                    </p>
                    <p className={styles["book-date"]}>
                        <strong>Data de Publicação:</strong>{" "}
                        {new Date(book.data_de_publicacao).toLocaleDateString()}
                    </p>

                    <button
                        className={styles["more-info-button"]}
                        onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                    >
                        {expandedBook === book.id ? "Ver menos" : "Mais informações"}
                    </button>

                    {expandedBook === book.id && (
                        <div className={styles["extra-info"]}>
                            {book.descricao && (
                                <p className={styles["book-description"]}>{book.descricao}</p>
                            )}
                            <p
                                className={`${styles["book-status"]} ${book.status === "Ativo" ? styles["active-status"] : styles["esgotado-status"]
                                    }`}
                            >
                                <strong>Status:</strong> {book.status}
                            </p>
                            <p className={styles["published-again"]}>
                                (Publicado em: {new Date(book.data_de_publicacao).toLocaleDateString()})
                            </p>
                        </div>
                    )}

                    {onOpenChat && book.email_publicador && book.email_publicador !== currentUser?.email && (
                        <button
                            className={styles["chat-button"]}
                            onClick={() => handleChatClick(book)}
                        >
                            Conversar com {book.username || "publicador"}
                        </button>
                    )}

                    {allowDelete && book.email_publicador === currentUser?.email && (
                        <button
                            className={styles["delete-button"]}
                            onClick={() => handleDelete(book.id)}
                        >
                            Deletar
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}