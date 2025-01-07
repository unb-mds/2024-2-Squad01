import Link from 'next/link';
import LoginCard from "../components/LoginCard/logincard";
import styles from "../styles/login.module.css";
import Button from "../components/button/button";

export default function Home() {
    return (
        <div className={styles.bloco}>
            <div className={styles.background}>
                <LoginCard title="unbOok">
                    <p>É ótimo tê-lo por aqui!</p>
                    <Button><Link href="/login">Login</Link></Button>
                    <Button><Link href="/register">Cadastro</Link></Button>
                </LoginCard>
            </div>
        </div>
    );
    <li>
    <a href="/central">Central de Ajuda</a>
    </li>
}