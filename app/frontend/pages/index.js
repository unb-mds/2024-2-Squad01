import Link from 'next/link';

export default function Home() {
    return (
        <div className="container">
            <h1>Bem-vindo ao Unbookinho</h1>
            <nav>
                <ul className="navList">
                    <li className="navItem">
                        <Link href="/register">Registrar</Link>
                    </li>
                    <li className="navItem">
                        <Link href="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}