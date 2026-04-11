import { API_BASE_URL } from '../Constants/constants';

export const getRecipes = async (from, limit) => {
  // TODO: fetch GET /api/recipes?from=X&limit=Y
};

export const getFeaturedRecipes = async (limit) => {
  // TODO: fetch GET /api/recipes/featured?limit=N
};

export const getRecipeById = async (id) => {
  // TODO: fetch GET /api/recipes/:id
};

export const getSimilarRecipes = async (id) => {
  // TODO: fetch GET /api/recipes/:id/similar
};

export const createRecipe = async (recipeData) => {
  // TODO: fetch POST /api/recipes
};
