import React from "react";
import "./meuperfil.css"; // Importando o CSS

// Componente Header
const Header = ({ userName }) => {
  return (
    <header className="profile-header">
      <div className="navbar">
        <h1 className="logo">UNBOOK</h1>
        <nav>
          <ul>
            <li><a href="#">FEED</a></li>
            <li><a href="#">SOBRE NÓS</a></li>
            <li className="profile-menu">
              OLÁ, {userName}
              <span className="menu-icon">☰</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Componente BookPost
const BookPost = ({ imageUrl, userName, description }) => {
  return (
    <div className="book-post">
      <img src={imageUrl} alt={description} />
      <p><strong>{userName}</strong> {description}</p>
    </div>
  );
};

// Componente Profile (Principal)
const Profile = () => {
  // Dados dinâmicos (simulados)
  const userData = {
    name: "Jessica Fernandes",
    course: "Engenharia de Software - FGA",
    bio: "Oi, meu nome é Jéssica, tenho 22 anos, estou cursando engenharia de software e amo livros.",
    profilePicture: "https://via.placeholder.com/150",
    posts: [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/200",
        description: "Os Dois Morrem no Final em ótimas condições",
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/200",
        description: "A Garota do Lago, ótima leitura para quem está entrando no mundo da leitura agora. Recomendo muito!",
      },
    ],
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <Header userName={userData.name} />

      {/* Conteúdo do Perfil */}
      <div className="profile-content">
        <div className="profile-picture">
          <img src={userData.profilePicture} alt={userData.name} />
        </div>
        <h2 className="profile-name">{userData.name}</h2>
        <p className="profile-info">{userData.course}</p>
        <p className="profile-bio">{userData.bio}</p>

        {/* Posts de Livros */}
        <div className="book-posts">
          {userData.posts.map((post) => (
            <BookPost
              key={post.id}
              imageUrl={post.imageUrl}
              userName={userData.name}
              description={post.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;