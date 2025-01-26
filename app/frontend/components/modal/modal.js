import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para salvar os dados
    console.log("Dados enviados!");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Adicionar Livro</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Adicionar Foto */}
          <div className={styles.formGroup}>
            <label htmlFor="photo">Adicionar Foto</label>
            <input type="file" id="photo" name="photo" accept="image/*" />
          </div>

          {/* Título do Livro */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Título do Livro</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Digite o título do livro"
              required
            />
          </div>

          {/* Nome do Autor */}
          <div className={styles.formGroup}>
            <label htmlFor="author">Nome do Autor</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Digite o nome do autor"
              required
            />
          </div>

          {/* Descrição */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              placeholder="Escreva a descrição do livro"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div className={styles.formGroup}>
            <label>Status</label>
            <div className={styles.statusButtons}>
              <button type="button" className={styles.donateButton}>
                Doar
              </button>
              <button type="button" className={styles.exchangeButton}>
                Trocar
              </button>
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