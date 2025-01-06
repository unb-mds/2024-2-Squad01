import styles from "./logincard.module.css";

export default function LoginCard({ title, children }) {
    return (
        <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {children}
        </div>
    );
}