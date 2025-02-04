import styles from "./input.module.css";

export default function Input({ type, name, placeholder, onChange, ...props }) {
    return (
        <input
            className={styles.input}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            {...props}
        />
    );
}