import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import LoginCard from "../components/LoginCard/logincard";
import Input from "../components/input/input";
import Button from "../components/button/button";
import styles from "../style/login.module.css";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Login realizado com sucesso!');
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            toast.error('Erro ao realizar login.');
        }
        console.log(data);
    };

    return (
        <div className={styles.bloco}>
            <div className={styles.background}>
                <LoginCard title="unbOok">
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <Input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Senha"
                        />
                        <Button type="submit">Login</Button>
                        <p>Não tem uma conta? <Link href="/register">Registre-se</Link></p>
                    </form>
                </LoginCard>
            </div>
        </div>
    )
}