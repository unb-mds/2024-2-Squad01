import React from "react";
import styles from "./footer.module.css";

const Footer = ({ children }) => {
  return (
    <>
      {children}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="/feed">Feed</a>
            <a href="/sobrenos">Sobre nós</a>
            <a href="/central">Central de Ajuda</a>
          </div>
          <p>&copy; {new Date().getFullYear()} UnBook. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
