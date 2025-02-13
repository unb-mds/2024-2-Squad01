import Sobrenos from '../components/Sobrenos/sobrenos';
import Navbar from '../components/navbar/navbar';
import SubNavbar from '../components/subnavbar/subnavbar'
import Footer from '../components/footer/footer';
import styles from '../components/Sobrenos/sobrenos.module.css'


const Sobre = () => {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Sobrenos />
      <div className={styles.text}>
      <div className={styles.container2}>
        <h1>Nossa missão</h1>
            <p>
              No Unbook, nosso propósito vai além de simplesmente doar/trocar livros usados. 
              Queremos promover a sustentabilidade e a paixão pela leitura. A cada livro que
              é adquirido em nosso sebinho, estamos contribuindo para a redução do desperdício
              e para o incentivo à leitura. Além disso, acreditamos que os livros podem enriquecer 
              vidas, inspirar mentes e criar conexões entre pessoas. É por isso que estamos dedicados
              a compartilhar essas preciosas histórias com você.
            </p>
            </div>
            </div>
    <Footer />
    </>
  );
};

export default Sobre;
