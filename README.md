# ItalianCuisineApp

Aplicación móvil de recetas de cocina italiana. Trabajo práctico final para la materia de laboratorio de programación.

---

## Stack

### Backend
- **Node.js** + **Express** — servidor HTTP y manejo de rutas
- **MongoDB Atlas** + **Mongoose** — base de datos en la nube y modelado de datos
- **bcrypt** — hash de contraseñas
- **jsonwebtoken** — autenticación mediante JWT
- **dotenv** — manejo de variables de entorno

### Frontend
- **React Native** + **Expo** — aplicación móvil multiplataforma
- **Expo Router** — navegación basada en el sistema de archivos

---

## Estructura del proyecto

```
ItalianCuisineApp/
├── app/
│   ├── server/          ← backend (Express)
│   └── expo-app/        ← frontend (React Native + Expo)
```

---

## Requisitos previos

- Node.js v18 o superior
- Expo CLI (`npm install -g expo-cli`)
- Archivo `.env` con las variables de entorno (ver `.env.example`)

---

## Instalación y ejecución

### Backend

```bash
cd app/server
npm install
npm start
```

El servidor queda disponible en `http://localhost:4000`.

### Frontend

```bash
cd app/expo-app
npm install
npx expo start
```

Desde la terminal de Expo se puede abrir la app en un emulador o en un dispositivo físico con Expo Go.

---

## Variables de entorno

El backend requiere un archivo `.env` en `app/server/`. Hay un `.env.example` con el formato esperado. Las variables necesarias son:

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | URI de conexión a MongoDB Atlas |
| `PORT` | Puerto del servidor (default: 4000) |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT |

---
