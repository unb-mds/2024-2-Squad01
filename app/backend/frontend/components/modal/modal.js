import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({
    foto: '',
    nomeLivro: '',
    nomeAutor: '',
    descricao: '',
    objetivo: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleObjetivoChange = (objetivo) => {
    setFormData(prev => ({
      ...prev,
      objetivo: objetivo
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/books/createBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Livro publicado com sucesso!');
        onClose()
        router.push("/")
      } else {
        toast.error('Erro ao publicar livro.');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Adicionar Livro</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Adicionar Foto */}
          <div className={styles.formGroup}>
            <label htmlFor="photo">Adicionar Foto</label>
            <input
              type="file"
              id="photo"
              name="foto"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* Título do Livro */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Título do Livro</label>
            <input
              type="text"
              id="title"
              name="nomeLivro"
              placeholder="Digite o título do livro"
              onChange={handleChange}
              required
            />
          </div>

          {/* Nome do Autor */}
          <div className={styles.formGroup}>
            <label htmlFor="author">Nome do Autor</label>
            <input
              type="text"
              id="author"
              name="nomeAutor"
              placeholder="Digite o nome do autor"
              onChange={handleChange}
              required
            />
          </div>

          {/* Descrição */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="descricao"
              placeholder="Escreva a descrição do livro"
              rows="4"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Finalidade */}
          <div className={styles.formGroup}>
            <label>Finalidade</label>
            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${formData.objetivo === 'Doar' ? styles.active : ''}`}>
                <input
                  type="radio"
                  name="objetivo"
                  value="Doar"
                  checked={formData.objetivo === 'Doar'}
                  onChange={(e) => handleObjetivoChange(e.target.value)}
                  className={styles.radioInput}
                />
                Doar
              </label>
              <label className={`${styles.radioLabel} ${formData.objetivo === 'Trocar' ? styles.active : ''}`}>
                <input
                  type="radio"
                  name="objetivo"
                  value="Trocar"
                  checked={formData.objetivo === 'Trocar'}
                  onChange={(e) => handleObjetivoChange(e.target.value)}
                  className={styles.radioInput}
                />
                Trocar
              </label>
            </div>
          </div>

          {/* Botão Confirmar */}
          <button type="submit" className={styles.confirmButton}>
            Confirmar
          </button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>
          Fechar
        </button>
      </div>
    </div>
  );
}