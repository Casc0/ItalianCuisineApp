const Rating = require('../../db/Rating');
const Recipe = require('../../db/Recipe');

const upsertRating = async (recipeId, userId, valor) => {
  // findOneAndUpdate con upsert: inserta si no existe, actualiza si ya existe
  // Esto respeta el índice único { recipeId, userId } sin lanzar error 11000
  await Rating.findOneAndUpdate(
    { recipeId, userId },
    { valor, createdAt: Date.now() },
    { upsert: true }
  );
};

const recalcularValoracion = async (recipeId) => {
  // Agregación: calcula promedio y total de valoraciones para esta receta
  const result = await Rating.aggregate([
    { $match: { recipeId } },
    {
      $group: {
        _id: null,
        promedio: { $avg: '$valor' }, // promedio de todos los valores
        total:    { $sum: 1 },        // cantidad de valoraciones
      },
    },
  ]);

  const { promedio, total } = result[0] ?? { promedio: 0, total: 0 };

  // Redondeamos a 1 decimal para evitar valores como 3.6666666...
  await Recipe.findByIdAndUpdate(recipeId, {
    'valoracion.promedio': Math.round(promedio * 10) / 10,
    'valoracion.total':    total,
  });
};

module.exports = { upsertRating, recalcularValoracion };
