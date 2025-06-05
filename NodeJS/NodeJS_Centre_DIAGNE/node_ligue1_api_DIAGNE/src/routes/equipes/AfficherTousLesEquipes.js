//EndPoint pour gerer l'affichage de toutes les équipes

const chemin = require("path");

module.exports = (app) => {
  app.get("/api/equipes", (req, res) => {

    // Chemin vers le fichier mock-equipes.js 

    const cheminRelatifMock = "../../db/mock-equipes.js";
    // On utilise __dirname pour obtenir le chemin absolu du répertoire courant
    // et on le combine avec le chemin relatif vers le fichier mock-equipes.js
    // pour obtenir le chemin absolu vers le fichier.
    // __dirname est une variable globale dans Node.js qui contient le chemin du répertoire
  const cheminAbsoluMock = chemin.resolve(__dirname, cheminRelatifMock);

    //si le fichier mock est déjà chargé en mémoire (en cache) :
        //     on supprime le cache pour recharger après :
        if (require.cache[cheminAbsoluMock]) {
            // console.log('Cache supprimé : ', cheminAbsoluMock);
            delete require.cache[cheminAbsoluMock];
        } else {
            // console.log('fic non trouvé dans le cache (première lecture).');
        }
    // On charge le fichier mock-equipes.js
    const equipes = require(cheminAbsoluMock);
    // On envoie la réponse au client
    const message = "Il y a " + equipes.length + " équipes dans la ligue 1";
    res.status(200).json({message: message, equipes: equipes});
  });
};
