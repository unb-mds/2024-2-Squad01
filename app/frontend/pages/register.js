import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import LoginCard from "../components/LoginCard/logincard";
import Input from "../components/input/input";
import Button from "../components/button/button";
import styles from "../styles/login.module.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        email: '',
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
        try {
            const response = await fetch('http://localhost:3002/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Usuário registrado com sucesso!');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                toast.error('Erro ao registrar usuário.');
            }
        } catch (error) {
            toast.error('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className={styles.bloco}>
            <div className={styles.background}>
                <LoginCard title="unbOok">
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <Input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                        />
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
                        <Button type="submit">Registrar</Button>
                        <p>Já possui uma conta? <Link href="/login">Login</Link></p>
                    </form>
                </LoginCard>
            </div>
        </div>
    );
}