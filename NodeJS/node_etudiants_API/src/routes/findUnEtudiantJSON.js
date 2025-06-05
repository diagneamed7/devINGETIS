//     ==============================================
//    Endpoint : reception d un parametre (id dans notre cas)
//     ==============================================
//    1) Je charge le fichier JSON dans une collection :
const etudiants = require("../db/mock-etudiants.js");
//    module.exports : permet d'appeler ce Endpoin à partir d'un
//    autre code (ici app.js) :
module.exports = (app) => {
  app.get("/api/etudiants/:id", (req, res) => {
    // 2) je récupère le paramètre 'id' transmis dans l'URL
    //  et je le convertis en un entier, grâce à la fonction parseInt()
    const idEtudiantDemande = parseInt(req.params.id);
    // 3) je cherche l'étudiant correspondant à l'id dans la collection :
    const etudiantTrouve = etudiants.find(
      (etudiant) => etudiant.id === idEtudiantDemande
    );
    // 4) je vérifie si un étudiant a été trouvé :
    if (etudiantTrouve) {
      // 5) Etudiant trouvé : je le renvoie au format JSON
      res.json(etudiantTrouve);
      console.log(
        `Étudiant trouvé et envoyé : ${etudiantTrouve.firstname} ${etudiantTrouve.lastname}`
      );
    } else {
      // 6) Aucun étudiant n'est trouvé :
      // Je renvoie un message d'erreur avec le statut 404
      res
        .status(404)
        .send("Aucun étudiant trouvé avec cet ID : " + idEtudiantDemande);
      console.warn(`Aucun étudiant trouvé pour l'ID : ${idEtudiantDemande}`);
    }
  });
};
