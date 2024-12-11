import styles from "../styles/login.module.css"
import Link from 'next/link'
import LoginCard from "../components/LoginCard/logincard"
import Input from "../components/input/input"
import Button from "../components/button/button"

export default function registerPage() {
    return (
        <div className={styles.bloco}>
        <div className={styles.background}>
            <LoginCard title="unbOok">
            <form className={styles.form}>
                <Input type="text" placeholder="Nome"/>
                <Input type="email" placeholder="Email"/>
                <Input type="password" placeholder="Senha"/>
                <Button>Cadastrar</Button>
                <p>Já possui uma conta? <Link href='/login'>Login</Link></p>
                </form>
            </LoginCard></div>
        </div>
    )
}