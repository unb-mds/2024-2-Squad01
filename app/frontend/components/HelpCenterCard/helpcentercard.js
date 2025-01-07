import styles from './helpcentercard.module.css';

const HelpCenterCard = () => {
  return (
    <section className={styles.helpCenter}>
      <div className={styles.container}>
        {/* Imagem */}
        <img
          src=".../public/helpcenter.png"
          alt="Central de Ajuda"
          className={styles.image}
        />

        {/* Texto */}
        <div className={styles.text}>
          <h1>Central de Ajuda</h1>
          <p>
            Seja bem-vindo à nossa Central de Ajuda, sua fonte centralizada para
            esclarecer dúvidas e receber suporte. Para garantir um atendimento
            eficiente e personalizado, estamos concentrando todas as
            interações através do email:
          </p>
          <p>
            <a href="mailto:suporteUNBook@gmail.com">suporteUNBook@gmail.com</a>
          </p>
          <p>
            Por favor, sinta-se à vontade para nos contatar para qualquer
            pergunta, problema ou sugestão que você possa ter. Nossa equipe
            dedicada está pronta para ajudar a responder às suas solicitações
            da melhor maneira possível.
          </p>
          <p>
            Agradecemos pela sua compreensão e colaboração. Estamos aqui para
            tornar sua experiência conosco a melhor possível.
          </p>
          <p>
            Atenciosamente, <br /> A Equipe de Suporte
          </p>
        </div>
      </div>
    </section>
  );
};

export default HelpCenterCard;
