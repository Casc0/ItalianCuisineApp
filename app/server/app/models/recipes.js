const Recipe = require('../../db/Recipe');

// Convierte un nombre en un slug URL-amigable: "Risotto ai Funghi" → "risotto-ai-funghi"
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')                 // descompone acentos: é → e + acento combinado
    .replace(/[\u0300-\u036f]/g, '')  // elimina los diacríticos resultantes
    .replace(/[^a-z0-9\s]/g, '')      // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-');            // reemplaza espacios (incluso múltiples) con guiones

const getPaginatedRecipes = async (from, limit) => {
  // Promise.all ejecuta ambas queries en paralelo en lugar de una tras otra
  const [data, total] = await Promise.all([
    Recipe.find().skip(from).limit(limit).lean(), // .lean() devuelve objetos JS planos, más rápido que documentos Mongoose
    Recipe.countDocuments(),
  ]);
  return { data, total };
};

const getRecipeById = async (slug) => {
  return Recipe.findOne({ slug }).lean();
};

const getRecipesByRating = async (minRating, limit) => {
  return Recipe.find({ 'valoracion.promedio': { $gte: minRating } }) // $gte: greater than or equal
    .sort({ 'valoracion.promedio': -1 })
    .limit(limit)
    .lean();
};

const getSimilarRecipes = async (slug, limit) => {
  const target = await getRecipeById(slug);
  if (!target) throw new Error('Receta no encontrada');

  const similar = await Recipe.find({
    slug: { $ne: slug },                              // $ne: not equal, excluye la receta actual
    identificadores: { $in: target.identificadores }, // $in: coincide si comparte al menos un identificador
  }).limit(limit).lean();

  // Si no hay similares, devuelve cualquier otra receta como fallback
  if (similar.length === 0) {
    return Recipe.find({ slug: { $ne: slug } }).limit(limit).lean();
  }
  return similar;
};

const addRecipe = async (recipeData) => {
  const newRecipe = new Recipe({
    ...recipeData,
    slug: slugify(recipeData.nombre), // generado a partir del nombre; el índice único en DB rechaza duplicados
  });
  return newRecipe.save();
};

module.exports = {
  getPaginatedRecipes,
  getRecipeById,
  getRecipesByRating,
  getSimilarRecipes,
  addRecipe,
};
