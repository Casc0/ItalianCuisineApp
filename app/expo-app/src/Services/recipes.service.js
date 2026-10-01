import { API_BASE_URL } from '../Constants/constants';

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

// Trae TODAS las recetas de una sola vez (usado solo para el buscador)
export const getAllRecipes = async () => {
  const response = await fetch(`${API_BASE_URL}/recipes?from=0&limit=70`);
  if (!response.ok) {
    throw new Error('Error al traer todas las recetas');
  }
  const json = await response.json();
  return json.data;
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
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Error al valorar la receta');
  }
  return json.data; // { promedio, total }
};