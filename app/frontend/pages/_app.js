// app/frontend/pages/_app.js
import '../style/home.css';
import '../style/login.css';
import '../components/LoginCard/logincard.css';
import '../components/button/button.css';
import '../components/input/input.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;