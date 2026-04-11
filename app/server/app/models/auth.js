const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../../db/User');

// Cuántas veces se aplica el algoritmo de hash (mayor = más seguro pero más lento)
const SALT_ROUNDS = 10;

const registerUser = async ({ nombre, email, password }) => {
  // bcrypt.hash genera un salt aleatorio y hashea la contraseña; nunca se guarda en texto plano
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ nombre, email, passwordHash });
  return user.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  // bcrypt.compare hashea el intento y lo compara con el hash guardado
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  // jwt.sign crea el token firmado con el payload y el secreto
  const token = jwt.sign(
    { id: user._id, email: user.email, nombre: user.nombre }, // datos que viajan dentro del token
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // el token expira en 7 días
  );

  return { token, user: { id: user._id, nombre: user.nombre, email: user.email } };
};

module.exports = { registerUser, loginUser };
