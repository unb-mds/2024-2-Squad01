import { useState } from 'react';
import Link from 'next/link';
import LoginCard from "../components/LoginCard/logincard";
import Input from "../components/input/input";
import Button from "../components/button/button";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

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
        console.log(data);
    };

    return (
        <div className="background">
            <LoginCard>
                <form onSubmit={handleSubmit}>
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
                </form>
                <Link href="/register">Não tem uma conta? Registre-se</Link>
            </LoginCard>
        </div>
    );
}