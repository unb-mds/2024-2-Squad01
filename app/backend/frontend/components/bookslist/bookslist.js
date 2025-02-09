import { useState, useEffect } from 'react';
import styles from './bookslist.module.css';

export default function BooksList({ endpoint, filter, noDataText }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedBook, setExpandedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(endpoint, { credentials: 'include' });
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
        };

        fetchBooks();
    }, [endpoint, filter]);

    if (loading) return <div className={styles.centered}>Carregando...</div>;
    if (!books.length) return <p className={styles.centered}>{noDataText || 'Nenhum livro encontrado.'}</p>;

    return (
        <div className={styles['books-list']}>
            {books.map((book) => (
                <div key={book.id} className={styles['book-card']}>

                    {/* "Cabeçalho" no estilo Instagram: foto do usuário e nome de usuário */}
                    <div className={styles.header}>
                        <img
                            className={styles['user-photo']}
                            src={
                                book.userPhoto && book.userPhoto.startsWith('http')
                                    ? book.userPhoto
                                    : `/uploads/${book.userPhoto || ''}`
                            }
                            alt={book.username || 'Usuário'}
                        />
                        <span className={styles['user-name']}>
                            {book.username || 'Usuário Desconhecido'}
                        </span>
                    </div>

                    {/* Imagem principal do livro */}
                    {book.foto ? (
                        <img
                            className={styles['book-image']}
                            src={
                                book.foto.startsWith('http')
                                    ? book.foto
                                    : `/uploads/${book.foto}`
                            }
                            alt={book.nome}
                        />
                    ) : (
                        <div className={styles['empty-book-image']} />
                    )}

                    {/* Título, objetivo e data */}
                    <h3 className={styles['book-title']}>{book.nome}</h3>
                    <p className={styles['book-objective']}>
                        <strong>Objetivo:</strong> {book.objetivo}
                    </p>
                    <p className={styles['book-date']}>
                        <strong>Data de Publicação:</strong>{' '}
                        {new Date(book.data_de_publicacao).toLocaleDateString()}
                    </p>

                    {/* Botão para exibir mais informações */}
                    <button
                        className={styles['more-info-button']}
                        onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                    >
                        {expandedBook === book.id ? 'Ver menos' : 'Mais informações'}
                    </button>

                    {/* Mostra descrição e data novamente (ou outras infos) ao clicar em "Mais informações" */}
                    {expandedBook === book.id && (
                        <div className={styles['extra-info']}>
                            {book.descricao && (
                                <p className={styles['book-description']}>
                                    {book.descricao}
                                </p>
                            )}
                            <p className={`${styles['book-status']} ${book.status === "Ativo" ? styles['active-status'] : styles['esgotado-status']}`}>
                                <strong>Status:</strong> {book.status}
                            </p>
                            <p className={styles['published-again']}>
                                (Publicado em: {new Date(book.data_de_publicacao).toLocaleDateString()})
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}