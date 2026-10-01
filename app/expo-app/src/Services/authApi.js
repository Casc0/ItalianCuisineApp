import { API_BASE_URL } from '../Constants/constants';

export const registerUser = async ({ nombre, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Error al registrarse');
  }
  return json.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Error al iniciar sesión');
  }
  return json;
};