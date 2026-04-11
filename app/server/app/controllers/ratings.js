const Recipe = require('../../db/Recipe');
const model  = require('../models/ratings');

const rateRecipe = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validamos que el valor esté en el rango permitido
    if (!valor || valor < 1 || valor > 5) {
      return res.status(400).json({ message: 'El valor debe ser un número entre 1 y 5.' });
    }

    // Buscamos la receta por slug para obtener su _id
    const recipe = await Recipe.findOne({ slug: req.params.id });
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada.' });
    }

    // req.user.id viene del middleware authenticate, no del body
    await model.upsertRating(recipe._id, req.user.id, valor);
    await model.recalcularValoracion(recipe._id);

    // Recargamos la receta para devolver la valoracion actualizada
    const updated = await Recipe.findById(recipe._id).select('valoracion').lean();
    res.json({ success: true, data: updated.valoracion });
  } catch (error) {
    console.error('Error en rateRecipe:', error);
    res.status(500).json({ message: 'Error al guardar la valoración.' });
  }
};

module.exports = { rateRecipe };
