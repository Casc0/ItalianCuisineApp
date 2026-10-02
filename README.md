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
- Expo Go (app en el celular, compatible con SDK 57) — permite probar la app en el dispositivo móvil durante el desarrollo
---

# Bibliotecas y dependencias
## Framework y base
- expo (^57.0.26) — framework de desarrollo móvil que permite compilar para Android, iOS y web desde un mismo código
- react (19.2.3) — biblioteca principal para construir interfaces de usuario mediante componentes reutilizables
- react-native (0.86.3) — convierte los componentes de React en elementos nativos del sistema operativo móvil
- react-dom (19.2.3) — renderizador de React para el navegador, necesario para la versión web
- react-native-web (^0.21.0) — capa de compatibilidad que permite ejecutar componentes de React Native en el navegador
- @expo/metro-runtime (~57.0.16) — empaquetador que agrupa todo el código JavaScript durante el desarrollo

## Navegación
- @react-navigation/native (^7.2.2) — sistema de navegación principal que gestiona el cambio entre pantallas
- @react-navigation/native-stack (^7.14.10) — navegador tipo pila (stack), cada pantalla se apila sobre la anterior permitiendo volver atrás
- react-native-screens (~4.26.0) — optimiza la navegación utilizando componentes de pantalla nativos del sistema operativo
- react-native-safe-area-context (~5.7.0) — gestiona las áreas seguras de la pantalla, evitando que el contenido quede oculto detrás del notch o la barra de estado

## Interfaz visual
- expo-font (~57.0.4) — permite cargar y usar fuentes tipográficas personalizadas
- @expo/vector-icons — colección de íconos vectoriales (MaterialIcons, FontAwesome, Ionicons, entre otros)
- expo-linear-gradient (~57.0.2) — componente para crear fondos con degradé de colores
- expo-status-bar (~57.0.1) — permite configurar la apariencia de la barra de estado del dispositivo

## Almacenamiento
- @react-native-async-storage/async-storage (2.2.0) — almacenamiento local persistente (clave-valor), usado para guardar el token de autenticación del usuario

# Instalación y ejecución

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

## Accesibilidad

Se evaluó la accesibilidad de la aplicación web utilizando **Lighthouse** (herramienta integrada en Google Chrome DevTools).

**Resultado obtenido: 100/100**

Las pruebas aprobadas incluyen:

- Contraste de colores suficiente entre texto y fondo
- Atributos ARIA correctamente utilizados
- Imágenes con texto alternativo (`alt`)
- Documento con título (`<title>`)
- Jerarquía de encabezados en orden secuencial
- Idioma del documento declarado en el elemento `<html>`
- Zoom no restringido para el usuario
- Landmark principal (`<main>`) presente
- Navegación por teclado sin conflictos de `tabindex`

> El JSON del reporte (lighthouse_accesibility.json) se encuentra adjuntado al trabajo, fuera de las carpetas principales. 
