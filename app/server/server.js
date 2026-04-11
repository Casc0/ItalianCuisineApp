require('dotenv').config(); // carga las variables del archivo .env en process.env

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET no está definido en las variables de entorno.');
  process.exit(1); // detiene el proceso con código de error antes de levantar el servidor
}

const app     = require('./app');
const connect = require('./db/connection');

const PORT = process.env.PORT || 4000;

// Primero conectamos a la base de datos; solo si tiene éxito levantamos el servidor
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
