import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("http://localhost:3002/auth/status", {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch("/auth/logout", {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setIsAuthenticated(false);
            } else {
                console.error("Erro ao fazer logout");
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">unbOok</Link>
            </div>
            <ul className={styles.navLinks}>
                {isAuthenticated ? (
                    <>
                        <li className={styles.login}>
                            <Link href="/profile">Perfil</Link>
                        </li>
                        <li>
                            <button
                                className={styles.botao}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={styles.login}>
                            <Link className={styles.loginl} href="/login">
                                Login
                            </Link>
                        </li>
                        <button className={styles.botao}>
                            <li>
                                <Link className={styles.cadastro} href="/register">
                                    Cadastre-se
                                </Link>
                            </li>
                        </button>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;