const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, senha, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'Nenhum usuário com esse email' })
    }

    try {
      if (await bcrypt.compare(senha, user.senha)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Senha incorreta' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize