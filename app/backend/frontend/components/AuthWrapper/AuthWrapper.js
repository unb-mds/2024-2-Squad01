import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const publicRoutes = ['/login', '/register'];

export default function AuthWrapper({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('Verificando autenticação...');
                const response = await fetch('/auth/status', {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    }
                });

                console.log('Status da resposta:', response.status);
                const data = await response.json();
                console.log('Dados recebidos:', data);

                const isPublicRoute = publicRoutes.includes(router.pathname);

                if (!data.isAuthenticated && !isPublicRoute) {
                    router.push('/login');
                } else if (data.isAuthenticated && isPublicRoute) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router.pathname]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return children;
}