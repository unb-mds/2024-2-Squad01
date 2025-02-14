import Navbar from '../components/navbar/navbar';
import SubNavbar from '../components/subnavbar/subnavbar'
import Footer from '../components/footer/footer';
import styles from '../styles/sobrenos.module.css'
import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const Sobre = () => {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className={styles.quadroazul}>
      <img src="/imagens/troca.jpg" alt="Sobre nos" className={styles.image} />
      <div className={styles.textContainer}>
        <h1 className={poppins.className}>Sobre nós</h1>
        <p className={roboto.className}>Bem-vindo ao Unbook, o seu destino literário único, 
          onde as histórias ganham vida em uma segunda vida!
        No Unbook, acreditamos que os livros têm múltiplas 
        histórias para contar. O nosso propósito é desvendar 
        essas histórias, proporcionando a você uma experiência 
        de leitura única e sustentável. Somos um sebinho online 
        especializado em resgatar, trocar e compartilhar livros 
        usados, que têm muito mais a oferecer do que você pode imaginar.</p>
      </div>
      </div>
      <div className={styles.quadrobranco}>
      <div className={styles.textContainer}>
        <h1 className={poppins.className}>Nossa Jornada</h1>
        <p className={roboto.className}>Há muito tempo, percebemos que os livros são tesouros escondidos 
          em prateleiras empoeiradas, esperando para serem redescobertos.
           Assim, começamos nossa missão de resgatar essas histórias esquecidas. 
           Cada livro que chega ao Unbook é cuidadosamente selecionado, 
           restaurado e apresentado a você com todo o carinho. Estamos 
           comprometidos com a ideia de que os livros merecem uma segunda
            chance de encantar leitores ávidos.</p>
      </div>
        <img src="/imagens/fga.jpg" alt="Sobre nos" className={styles.image} />
      </div>

      <div className={styles.quadroverde}>
      <img src="/imagens/doar.jpg" alt="Sobre nos" className={styles.image} />
      <div className={styles.textContainer}>
      <h1 className={poppins.className}>Nossa Missão</h1>
      <p className={roboto.className}>No Unbook, nosso propósito vai além de simplesmente doar/trocar livros usados. 
        Queremos promover a sustentabilidade e a paixão pela leitura. A cada livro que é 
        adquirido em nosso sebinho, estamos contribuindo para a redução do desperdício e 
        para o incentivo à leitura. Além disso, acreditamos que os livros podem enriquecer vidas, 
        inspirar mentes e criar conexões entre pessoas. 
        É por isso que estamos dedicados a compartilhar essas preciosas histórias com você.</p>
      </div>
</div>

    <Footer />
    </>
  );
};

export default Sobre;
