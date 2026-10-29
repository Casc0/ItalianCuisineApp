const model = require('../models/ratings');

const rateRecipe = async (req, res) => {
  try {
    const { valor } = req.body;

    if (typeof valor !== 'number' || valor < 1 || valor > 5) {
      return res.status(400).json({ message: 'El valor debe ser un número entre 1 y 5.' });
    }

    const recipe = await model.getRecipeBySlug(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada.' });
    }

    await model.upsertRating(recipe._id, req.user.id, valor);
    await model.recalcularValoracion(recipe._id);

    const valoracion = await model.getValoracion(recipe._id);
    res.json({ success: true, data: valoracion });
  } catch (error) {
    console.error('Error en rateRecipe:', error);
    res.status(500).json({ message: 'Error al guardar la valoración.' });
  }
};

module.exports = { rateRecipe };