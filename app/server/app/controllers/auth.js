const model = require('../models/auth');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'nombre, email y password son requeridos.' });
    }

    const user = await model.registerUser({ nombre, email, password });
    // No devolvemos el passwordHash, solo los datos públicos del usuario
    res.status(201).json({
      success: true,
      data: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    // Código 11000: MongoDB rechazó la operación por un valor duplicado (el email ya existe)
    if (error.code === 11000) {
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email y password son requeridos.' });
    }

    const result = await model.loginUser({ email, password });
    // El modelo devuelve null tanto si el email no existe como si la contraseña es incorrecta
    // (no diferenciamos para no dar pistas a un atacante)
    if (!result) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // result contiene { token, user } — el cliente debe guardar el token para futuras requests
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
};

module.exports = { register, login };
