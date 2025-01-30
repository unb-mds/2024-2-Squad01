import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("/api/auth/status"); 
                const data = await response.json();
                setIsAuthenticated(data.authenticated); 
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">unbOok</Link>
            </div>
            <ul className={styles.navLinks}>
                {isAuthenticated ? (
                    <>
                        <li className={styles.login}><Link href="/profile">Perfil</Link></li>
                        <li><button className={styles.botao} onClick={async () => {
                            await fetch("/api/auth/logout", { method: "POST" });
                            setIsAuthenticated(false);
                        }}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li className={styles.login}><Link  className={styles.loginl}href="/login">Login</Link></li>
                        <button className={styles.botao}><li><Link className={styles.cadastro} href="/register">Cadastre-se</Link></li></button>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
