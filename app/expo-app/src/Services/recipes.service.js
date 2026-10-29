import { API_BASE_URL } from '../Constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Si el servidor responde 401, el token venció: lo borramos
const handleUnauthorized = async (response) => {
  if (response.status === 401) {
    await AsyncStorage.removeItem('token');
    throw new Error('Tu sesión expiró. Por favor, volvé a iniciar sesión.');
  }
};

export const getRecipes = async (from, limit) => {
  const response = await fetch(`${API_BASE_URL}/recipes?from=${from}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error al traer las recetas');
  }
  return response.json();
};

export const getFeaturedRecipes = async (limit) => {
  const response = await fetch(`${API_BASE_URL}/recipes/featured?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error al traer las recetas destacadas');
  }
  const json = await response.json();
  return json.data;
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
  if (!response.ok) {
    throw new Error('Error al traer la receta');
  }
  const json = await response.json();
  return json.data;
};

export const getSimilarRecipes = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}/similar`);
  if (!response.ok) {
    throw new Error('Error al traer recetas similares');
  }
  const json = await response.json();
  return json.data;
};

export const getAllRecipes = async () => {
  let all = [];
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${API_BASE_URL}/recipes?from=${from}&limit=50`);
    if (!response.ok) {
      throw new Error('Error al traer todas las recetas');
    }
    const json = await response.json();
    all = [...all, ...json.data];
    hasMore = json.hasMore;
    from += 50;
  }

  return all;
};

export const createRecipe = async (recipeData) => {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Error al guardar la receta');
  }
  return json.data;
};

export const rateRecipe = async (slug, valor, token) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${slug}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ valor }),
  });
  await handleUnauthorized(response);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Error al valorar la receta');
  }
  return json.data;
};