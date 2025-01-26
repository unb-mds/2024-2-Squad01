import styles from "./caixinha.module.css";
import Button2 from "../button2/button2";

export default function Caixinha({ title, children, onClick }) {
  return (
    <div className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      <Button2 onClick={onClick}>{title}</Button2>
    </div>
  );
}
