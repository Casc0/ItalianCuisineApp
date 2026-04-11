
const express       = require("express");
const controller    = require('../controllers/recipes.js');
const ratingCtrl    = require('../controllers/ratings.js');
const authenticate  = require('../middleware/authenticate.js');
const router        = express.Router();

router.get("/", controller.getRecipes);
router.get("/featured", controller.getFeaturedRecipes); // debe ir antes de /:id o Express lo interpretaría como un slug
router.post("/", controller.addRecipe);
router.get("/:id", controller.getRecipeById);
router.get("/:id/similar", controller.getSimilarRecipes);
router.post("/:id/rate", authenticate, ratingCtrl.rateRecipe); // authenticate verifica el JWT antes de llegar al controlador
module.exports = router;


