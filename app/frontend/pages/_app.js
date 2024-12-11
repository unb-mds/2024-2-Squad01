// app/frontend/pages/_app.js
import '../style/global.css';
import '../style/login.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    );
}

export default MyApp;