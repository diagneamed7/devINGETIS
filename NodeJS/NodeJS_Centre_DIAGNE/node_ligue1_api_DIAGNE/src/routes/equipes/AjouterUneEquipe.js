const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
  app.post("/api/equipes", (req, res) => {
    
    // Chemin relatif vers le fichier mock-equipes.js (depuis ce fichier)
    const cheminRelatifMock = "../../db/mock-equipes.js";
    // Conversion du chemin relatif en chemin absolu grâce à __dirname (répertoire courant du fichier JS)
    // Cela permet d'obtenir le chemin complet du fichier sur le disque, peu importe où le script est lancé
    const cheminAbsoluMock = path.resolve(__dirname, cheminRelatifMock);

    if (require.cache[cheminAbsoluMock]) {
      delete require.cache[cheminAbsoluMock];
    }

    const equipes = require(cheminAbsoluMock);

    // Vérifier si l'ID existe déjà
    if (equipes.find((e) => e.id === req.body.id)) {
      return res.status(400).json({ message: "Cet ID existe déjà !" });
    }

    // Créer la nouvelle équipe avec l'ID fourni dans le body
    const nouvelleEquipe = {
      ...req.body,
      Created: new Date().toISOString(),
    };

    equipes.push(nouvelleEquipe);

    // Sauvegarder dans le fichier (optionnel)
    gestionnaireFic.writeFileSync(
      cheminAbsoluMock,
      "module.exports = " + JSON.stringify(equipes, null, 2)
    );

    res
      .status(201)
      .json({ message: "Équipe ajoutée avec succès", equipe: nouvelleEquipe });
  });
};
