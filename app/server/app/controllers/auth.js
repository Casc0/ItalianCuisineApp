const model = require('../models/auth');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'nombre, email y password son requeridos.' });
    }

    // Validar reglas de contraseña (mismas que en el cliente)
    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos una mayúscula.' });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos un número.' });
    }

    const user = await model.registerUser({ nombre, email, password });
    res.status(201).json({
      success: true,
      data: { id: user._id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
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
