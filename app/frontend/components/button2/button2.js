import styles from "./button2.module.css";

export default function Button2({ type, children, ...props }) {
    return (
        <button className={styles.button} type={type} {...props}>
            {children}
        </button>
    );
}