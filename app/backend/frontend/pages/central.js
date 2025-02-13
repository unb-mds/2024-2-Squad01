import HelpCenter from '../components/HelpCenter/helpcenter';
import Navbar from '../components/navbar/navbar';
import SubNavbar from '../components/subnavbar/subnavbar'
import Footer from '../components/footer/footer';


const Central = () => {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <HelpCenter />

      <section style={{ padding: '2rem', background: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center' }}>Perguntas Frequentes</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3>Como posso doar meus livros?</h3>
          <p>
            Para doar seus livros na UNBook, acesse o site, faça login ou crie
            uma conta, clique em "Anunciar", preencha informações como título e
            descrição, adicione fotos atraentes e publique. Lembre-se de
            praticar segurança ao encontrar interessados.
            </p>
          <h3>Como redefinir minha senha?</h3>
          <p>
            Acesse a página de login e procure pela opção "Esqueci minha senha".
            Insira seu e-mail e siga as instruções enviadas.
          </p>
        </div>
      </section>
    <Footer />
    </>
  );
};

export default Central;