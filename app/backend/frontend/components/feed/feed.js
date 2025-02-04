import { useState, useEffect } from 'react';

export default function Feed() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3002/books', { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Livros recebidos:", data);
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
    }, []);

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            {books.length > 0 ? (
                books.map((book) => (
                    <div key={book.id} className="book-card">
                        {book.foto && (
                            <img src={book.foto} alt={book.nome} style={{ maxWidth: '200px' }} />
                        )}
                        <h3>{book.nome}</h3>
                        <p><strong>Autor:</strong> {book.autor}</p>
                        {book.descricao && <p>{book.descricao}</p>}
                        <p><strong>Status:</strong> {book.status}</p>
                        <p><strong>Objetivo:</strong> {book.objetivo}</p>
                        <p>
                            <strong>Publicado em:</strong> {new Date(book.data_de_publicacao).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <p>Nenhum livro encontrado.</p>
            )}
        </div>
    );
}