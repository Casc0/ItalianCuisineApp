const model = require("../models/recipes.js");

const getFeaturedRecipes = async (req, res) => {
  try {
    const parsedLimit = parseInt(req.query.limit) || 1;
    const results = await model.getRecipesByRating(5, parsedLimit);
    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Error en getFeaturedRecipes:", error);
    res.status(500).json({ message: "Error al procesar las recetas destacadas." });
  }
};

const getRecipes = async (req, res) => {
  try {
    const from  = Math.max(0, parseInt(req.query.from) || 0);          // nunca negativo
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 6)); // entre 1 y 50

    const { data, total } = await model.getPaginatedRecipes(from, limit);

    res.json({
      success: true,
      data,
      total,
      from,
      limit,
      hasMore: from + limit < total, // indica al cliente si quedan más páginas
    });
  } catch (error) {
    console.error("Error en getRecipes:", error);
    res.status(500).json({ message: "Error al procesar las recetas." });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const result = await model.getRecipeById(req.params.id);
    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(404).json({ message: "Receta no encontrada." });
    }
  } catch (error) {
    console.error("Error en getRecipeById:", error);
    res.status(500).json({ message: "Error al buscar la receta." });
  }
};

const getSimilarRecipes = async (req, res) => {
  try {
    const result = await model.getSimilarRecipes(req.params.id, 5);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error en getSimilarRecipes:", error);
    res.status(500).json({ message: "Error al buscar recetas similares." });
  }
};

const addRecipe = async (req, res) => {
  try {
    // req.user.id viene del middleware authenticate; lo adjuntamos para registrar quién creó la receta
    const newRecipe = await model.addRecipe(req.body, req.user.id);
    res.status(201).json({ success: true, data: newRecipe });
  } catch (error) {
    // El slug se genera desde el nombre; si ya existe una receta con ese nombre, el índice único lo rechaza
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ya existe una receta con ese nombre.' });
    }
    console.error("Error en addRecipe:", error);
    res.status(500).json({ message: "Error al guardar la receta." });
  }
};

module.exports = {
  getFeaturedRecipes,
  getRecipes,
  getRecipeById,
  getSimilarRecipes,
  addRecipe,
};
