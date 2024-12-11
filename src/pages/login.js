import Link from 'next/link'
import styles from "../styles/login.module.css"
import LoginCard from "../components/LoginCard/logincard"
import Input from "../components/input/input"
import Button from "../components/button/button"

export default function loginPage() {
    return (
    <div className={styles.bloco}>
        <div className='body'>
            <div className={styles.background}>
                <LoginCard title="unbOok">
                    <form className={styles.form}>
                    <Input type="email" placeholder="Email"/>
                    <Input type="password" placeholder="Senha"/>
                    <Button>Entrar</Button>
                    <p>Ainda não possui uma conta? <Link href='/register' className='link'>Cadastre-se</Link></p>
                    </form>
                </LoginCard>
            </div>
        </div>
     </div>
    )
}