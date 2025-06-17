//  =========================================
//  Endpoint : Ajout d'un étudiant dans la BD
// =============================================

// Endpoint : Supprimer un étudiant dans la BD :
// =============================================
//  1) référence au code de conexion à la BD  comme une fonction :
const obtenirconnexionBD = require("./connexion_BD_SQL");

module.exports = (app) => {
  // Endpoint
  app.delete("/api/etudiants/:id", async (req, res) => {
    //  préparer un objet pour la connexion :
    let connexion;
    try {
      // 1) Récupérer l'ID de l'étudiant depuis les paramètres de l'URL
      const idEtudiant = req.params.id;
      // 2) Se connecter à la BD :
      connexion = await obtenirconnexionBD();

      // 3)  Requête SQL DELETE
      //          3.1) on prépare une chaîne :
      const requeteSQL = `DELETE FROM etudiants WHERE id = ?`;
      //          3.2) on prépare une chaîne :
      //              on passant l'id de l'étudiant à supprimer :
      const resultat = await connexion.query(requeteSQL, [idEtudiant]);
      // 4) Gérer le résultat de la suppression
      if (resultat.affectedRows === 0) {
        // pas de suppression :
        return res
          .status(404)
          .json({
            message: `Aucun étudiant trouvé avec l'ID ${idEtudiant} pour la suppression.`,
          });
      }

      // suppression OK :
      console.log(`Étudiant avec l'ID ${idEtudiant} supprimé de la BD.`);
      res
        .status(200)
        .json({
          message: `Étudiant avec l'ID ${idEtudiant} supprimé avec succès.`,
          id: idEtudiant,
        });
    } catch (error) {
      // 5) Problème du côté de l'API :
      console.error(
        `Problème lors de la suppression de l'étudiant avec l'ID ${req.params.id} :`,
        error.message
      );

      // Renvoie un statut 500 (Internal Server Error) à l'application cliente.
      res
        .status(500)
        .json({ message: "Erreur API lors de la suppression de l'étudiant." });
    } finally {
      // 6) Fermer la connexion à la base de données :
      if (connexion) {
        connexion.release();
        console.log("Connexion fermée après suppression.");
      }
    }
  });

  // Log pour indiquer que la route a été chargée au démarrage de l'API.
  console.log(
    "Route '/api/etudiants/:id' (DELETE) chargée pour la suppression d'étudiant."
  );
};
