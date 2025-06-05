// ==============================================
// Endpoint : renvoyer tous les étudiants
// ==============================================
// je crée un objet qui me permet de définit des chemins
// de fichiers sur le disque :
const chemin = require('path'); // Nécessaire pour chemin.resolve


module.exports = (app) => {
    app.get('/api/etudiants', (req, res) => {
        // 1) Chemin relatif correct depuis findTouslesEtudiantsJSON.js vers mock-etudiants.js
        const cheminRelatifMock = '../db/mock-etudiants.js';


        // 2) Obtenir le chemin absolu du module pour l'invalidation du cache
        const cheminAbsoluMock = chemin.resolve(__dirname, cheminRelatifMock);


        // 3) si le fichier mock est déjà chargé en mémoire (en cache) :
        //     on supprime le cache pour recharger après :
        if (require.cache[cheminAbsoluMock]) {
            // console.log('Cache supprimé : ', cheminAbsoluMock);
            delete require.cache[cheminAbsoluMock];
        } else {
            // console.log('fic non trouvé dans le cache (première lecture).');
        }


        // 4) Recharger le fichier mock-etudiants.js pour obtenir la version la plus récente
        // on met le contenu du mock dans une collection :
        const etudiants = require(cheminRelatifMock);
        const message = "Il y a " + etudiants.length + " étudiants dans la collection.";
        res.json({ texte: message, donnees: etudiants });
    });
};
