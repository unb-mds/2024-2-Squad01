import Link from 'next/link';
import LoginCard from "../components/LoginCard/logincard";
import Caixinha from "../components/caixinha/caixinha";
import Button from "../components/button/button";
import Navbar from "../components/navbar/navbar";
import styles from "../styles/index.module.css";
import SubNavbar from "../components/subnavbar/subnavbar"

export default function Home() {
    return (

        <>
        <Navbar />
        <SubNavbar />

        <div className={styles.fundoazul}></div>
        <div className={styles.funcoes}></div>

        <p>TROCAR E DOAR NUNCA FOI TÃO FÁCIL</p>

        <div className={styles.caixinhas}>
        <Caixinha title="CADASTRE-SE">
          <p>Crie sua conta na plataforma de forma rápida e gratuita</p>
        </Caixinha>
        <Caixinha title="PUBLIQUE">
          <p>Escolha os livros que você deseja doar ou trocar</p>
        </Caixinha>
        <Caixinha title="DESCUBRA">
          <p>Explore os livros disponíveis na plataforma</p>
        </Caixinha>
      </div>

        </>
    );
}