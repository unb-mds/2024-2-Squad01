import React from "react";
import styles from "./subnavbar.module.css";
import Link from "next/link";

const SubNavbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li className={styles.botoes}><Link href="/feed">Feed</Link></li>
                <li className={styles.botoes}><Link href="/sobrenos">Sobre Nos</Link></li>
                
            </ul>
        </nav>
    );
};

export default SubNavbar;
