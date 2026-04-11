const jwt = require('jsonwebtoken');

// Middleware: se ejecuta antes del controlador en rutas protegidas
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // El header debe venir como: Authorization: Bearer <token>
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido.' });
  }

  // Extraemos solo el token, descartando el prefijo "Bearer "
  const token = authHeader.slice(7);
  try {
    // jwt.verify lanza una excepción si el token es inválido o expiró
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Solo exponemos los campos necesarios, no todo el payload del JWT
    req.user = { id: decoded.id, email: decoded.email, nombre: decoded.nombre };
    next(); // token válido: continuamos al controlador
  } catch (error) {
    // TokenExpiredError: el token fue válido pero ya venció (distinto a uno falso)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado.' });
    }
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authenticate;
