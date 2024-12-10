import { useState } from 'react';
import Link from 'next/link';
import LoginCard from "../components/LoginCard/logincard";
import Input from "../components/input/input";
import Button from "../components/button/button";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        matricula: '',
        nome: '',
        senha: '',
        email: '',
        foto: '',
        whatsApp: '',
        instagram: ''
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
        const response = await fetch('http://localhost:3000/user/register', {
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
                        type="text"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleChange}
                        placeholder="Matrícula"
                    />
                    <Input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome"
                    />
                    <Input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="Senha"
                    />
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <Input
                        type="text"
                        name="foto"
                        value={formData.foto}
                        onChange={handleChange}
                        placeholder="Foto"
                    />
                    <Input
                        type="text"
                        name="whatsApp"
                        value={formData.whatsApp}
                        onChange={handleChange}
                        placeholder="WhatsApp"
                    />
                    <Input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="Instagram"
                    />
                    <Button type="submit">Registrar</Button>
                </form>
                <Link href="/login">Já tem uma conta? Faça login</Link>
            </LoginCard>
        </div>
    );
}