// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
// Exemple de route pour afficher toutes les catégories
router.get("/", (req, res) => {
  res.render("categoryList");
  // Vous pouvez changer 'categoryList' par le nom de votre vue
});
// Exemple de route pour ajouter une catégorie
router.post("/", (req, res) => {
  const { name } = req.body;
  // Ajouter la logique pour enregistrer la catégorie
  res.redirect("/categories");
});
module.exports = router;
