import styles from "./logincard.module.css"

export default function logincard({ title, children }) {
    return (
        <div className={styles.Card}>
            <h2 className={styles.title}>{ title }</h2>
            { children }
        </div>
    )
}