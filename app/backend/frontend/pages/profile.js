import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styles from '../styles/profile.module.css';
import Modal from '../components/modal/modal';
import BooksList from '../components/bookslist/bookslist';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import SubNavbar from '../components/subnavbar/subnavbar';


export default function ProfilePage() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        foto_preview: '',
        whatsApp: '',
        instagram: '',
        senha: ''
    });
    const [profileFile, setProfileFile] = useState(null);
    const [publishedBooks, setPublishedBooks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isBookModalOpen, setBookModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/users/getProfile', { credentials: 'include' });
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        nome: data.nome || '',
                        descricao: data.descricao || '',
                        foto_preview: data.foto ? `/uploads/profile-photos/${data.foto}` : '',
                        whatsApp: data.whatsApp || '',
                        instagram: data.instagram || '',
                        senha: ''
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar perfil:', error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchPublishedBooks = async () => {
            try {
                const res = await fetch('/users/getPublishedBooks', { credentials: 'include' });
                const data = await res.json();
                if (res.ok) {
                    setPublishedBooks(data);
                }
            } catch (error) {
                console.error('Erro ao buscar livros publicados:', error);
            }
        };
        fetchPublishedBooks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file);
            const previewUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                foto_preview: previewUrl
            }));
        }
    };

    const toggleEditing = () => {
        setIsEditing(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('nome', formData.nome);
            data.append('descricao', formData.descricao);
            data.append('whatsApp', formData.whatsApp);
            data.append('instagram', formData.instagram);
            data.append('senha', formData.senha);
            if (profileFile) {
                data.append('foto', profileFile);
            }

            const response = await fetch('/users/updateProfile', {
                method: 'PUT',
                credentials: 'include',
                body: data
            });
            const resData = await response.json();
            if (response.ok) {
                toast.success('Perfil atualizado com sucesso!');
                setIsEditing(false);
                router.reload();
            } else {
                toast.error(resData.error || 'Erro ao atualizar perfil.');
            }
        } catch (error) {
            console.error('Erro:', error);
            toast.error('Erro ao conectar com o servidor.');
        }
    };

    const openBookModal = () => {
        setBookModalOpen(true);
    };

    const closeBookModal = () => {
        setBookModalOpen(false);
    };

    return (
        <div>
            <Navbar />
            <SubNavbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Perfil</h1>
                <div className={styles.profilePhotoContainer}>
                    <div className={styles.photoWrapper}>
                        {formData.foto_preview ? (
                            <img
                                src={formData.foto_preview}
                                alt="Foto de Perfil"
                                className={styles.profilePhoto}
                            />
                        ) : (
                            <div className={styles.emptyProfileCircle}></div>
                        )}
                        {isEditing && (
                            <>
                                <label htmlFor="fileInput" className={styles.fileLabel}>
                                    <svg
                                        className={styles.cameraIcon}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={styles.fileInput}
                                />
                            </>
                        )}
                    </div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Descrição:
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Descrição do seu perfil"
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Seu nome"
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        WhatsApp:
                        <input
                            type="text"
                            name="whatsApp"
                            value={formData.whatsApp}
                            onChange={handleChange}
                            placeholder="Número do WhatsApp"
                            disabled={!isEditing}
                        />
                    </label>
                    <label>
                        Instagram:
                        <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Usuário do Instagram"
                            disabled={!isEditing}
                        />
                    </label>
                    <button type="button" className={styles.editButton} onClick={toggleEditing}>
                        {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
                    </button>
                    {isEditing && (
                        <button type="submit" className={styles.button}>
                            Salvar Alterações
                        </button>
                    )}
                </form>
                <section>
                    <h2 className={styles.sectionTitle}>Livros Publicados</h2>
                    <BooksList
                        endpoint="/users/getPublishedBooks"
                        noDataText="Publique seu primeiro livro"
                    />
                </section>
                <Modal isOpen={isBookModalOpen} onClose={closeBookModal} />
            </div>
            <Footer />
        </div>
    );
}