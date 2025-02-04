import { useState, useEffect } from 'react';
import Caixinha from "../components/caixinha/caixinha";
import Navbar from "../components/navbar/navbar";
import styles from "../styles/index.module.css";
import SubNavbar from "../components/subnavbar/subnavbar"
import Footer from "../components/footer/footer"
import Modal from "../components/modal/modal"
import Feed from "../components/feed/feed";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/auth/status", {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (

    <>
      <Navbar />
      <SubNavbar />

      <div className={styles.fundoazul}></div>
      <Feed />
      <div className={styles.funcoes}></div>

      <p className={styles.titulo}>TROCAR E DOAR NUNCA FOI TÃO FÁCIL</p>

      <div className={styles.caixinhas}>
        {!isAuthenticated && (
          <Caixinha title="CADASTRE-SE">
            <p>Crie sua conta na plataforma de forma rápida e gratuita</p>
          </Caixinha>
        )}
        <Caixinha title="PUBLIQUE" onClick={openModal}>
          <p>Escolha os livros que você deseja doar ou trocar</p>
        </Caixinha>
        <Caixinha title="DESCUBRA">
          <p>Explore os livros disponíveis na plataforma</p>
        </Caixinha>
      </div>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Nova Publicação</h2>
        <p>Arraste suas fotos ou clique para selecionar do computador.</p>
        <button className={styles.uploadButton}>Selecionar do Computador</button>
      </Modal>

    </>
  );
}