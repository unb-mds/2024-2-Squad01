import styles from "../styles/login.css" 
import styles from "./logincard.css"

export default function logincard({ title, children }) {
    return (
        <div className={styles.Card}>
            <h4 className={styles.title}>{ title }</h4>
            { children }
        </div>
    )
}