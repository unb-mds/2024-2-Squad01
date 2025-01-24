import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">unbOok</Link>
            </div>
            <ul className={styles.navLinks}>
                <li className={styles.login}><Link href="/login">Login</Link></li>
            
                <button className={styles.botao}><li><Link href="/register">Cadastre-se</Link></li></button>
            </ul>
        </nav>
    );
};

export default Navbar;
