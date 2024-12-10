export default function Button({ type, children }) {
    return (
        <button className="button" type={type}>
            {children}
        </button>
    );
}