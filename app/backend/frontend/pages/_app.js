import '../styles/global.css';
import '../styles/login.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthWrapper from '../components/AuthWrapper/AuthWrapper';

function MyApp({ Component, pageProps }) {
    return (
        <AuthWrapper>
            <Component {...pageProps} />
            <ToastContainer />
        </AuthWrapper>
    );
}

export default MyApp;