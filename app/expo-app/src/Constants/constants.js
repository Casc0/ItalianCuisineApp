// TODO: change this to your server's LAN IP when testing on a physical device
// e.g. "http://192.168.1.100:4000"
export const SERVER_URL = "http://192.168.0.130:4000"; // sin /api al final
export const API_BASE_URL = `${SERVER_URL}/api`;
export const PAGE_SIZE = 6;

// Completa rutas relativas de imagen con la URL del servidor
export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path; // ya es una URL completa, no tocar
  return `${SERVER_URL}/${path}`;
};