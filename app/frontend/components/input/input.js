export default function Input({ type, name, placeholder, onChange }) {
    return (
        <input
            className="input"
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}