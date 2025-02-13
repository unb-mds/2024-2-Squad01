import Navbar from "../navbar/navbar";
import SubNavbar from "../subnavbar/subnavbar";
import Footer from "../footer/footer";
import styles from "./sobrenos.module.css";

const Sobre = () => {
  return (
    <>
      
      <section className={styles.sobrenos}>
        
          <div className={styles.text}>

          <div className={styles.container}>
            <h1>Sobre nós</h1>
            <p>
              Bem-vindo ao Unbook, o seu destino literário único, onde as 
              histórias ganham vida em uma segunda vida!
              No Unbook, acreditamos que os livros têm múltiplas histórias 
              para contar. O nosso propósito é desvendar essas histórias, 
              proporcionando a você uma experiência de leitura única e sustentável. 
              Somos um sebinho online especializado em resgatar, trocar e compartilhar 
              livros usados, que têm muito mais a oferecer do que você pode imaginar.
            </p>
            </div>
        </div>
      </section>
      <div className={styles.text}>
      <div className={styles.container1}>
            <h1>Nossa Jornada</h1>
            <p>
              Há muito tempo, percebemos que os livros são tesouros escondidos 
              em prateleiras empoeiradas, esperando para serem redescobertos. 
              Assim, começamos nossa missão de resgatar essas histórias esquecidas. 
              Cada livro que chega ao Unbook é cuidadosamente selecionado, restaurado 
              e apresentado a você com todo o carinho. Estamos comprometidos com a ideia
              de que os livros merecem uma segunda chance de encantar leitores ávidos.
            </p>
            </div>
        </div>

      
    </>
  );
};

export default Sobre;
