import styles from "./button.module.css";

export default function Button({ type, children, ...props }) {
    return (
        <button className={styles.button} type={type} {...props}>
            {children}
        </button>
    );
}