// app/frontend/pages/_app.js
import '../style/global.css';
import '../style/login.module.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;