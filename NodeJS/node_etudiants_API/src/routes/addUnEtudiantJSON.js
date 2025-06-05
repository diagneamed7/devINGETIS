// ==============================================
// Endpoint : ajouter un étudiant
// ==============================================
// on crée un objet pour gérer les fichiers sur disque :
const gestionnaireFic = require('fs');
// on crée un objet pour stocker le chemin du fichier mock :
const chemin = require('path');


module.exports = (app) => {
    app.post('/api/etudiants', (req, res) => {
        // 1) Chemin relatif correct depuis addUnEtudiantJSON.js vers mock-etudiants.js
        const cheminRelatifMock = '../db/mock-etudiants.js';
        // 2) Obtenir le chemin absolu du module :
        const cheminAbsoluMock = chemin.resolve(__dirname, cheminRelatifMock);


        // Correction ici: les parenthèses étaient mal placées dans le console.log
        console.log('Chemin absolu du module mock-etudiants.js pour le cache:', cheminAbsoluMock);


        // 3) si Node a déjà chargé le fichier mock en mémoire (en cache) :
        // on supprime le cache pour pouvoir recharger le mock depuis
        // le disque :
        if (require.cache[cheminAbsoluMock]) {
            // Correction ici aussi
            console.log('Cache purgé pour:', cheminAbsoluMock);
            delete require.cache[cheminAbsoluMock];
        } else {
            console.log('Module non trouvé dans le cache (première lecture ou cache déjà purgé).');
        }


        // 4) Recharger le fichier mock pour avoir la version la plus récente :
        const etudiants = require(cheminRelatifMock);
        console.log('Nombre d\'étudiants après rechargement (avant ajout):', etudiants.length);
       
        // 5) on crée une structure JSON avec le nouvel étudiant :
        const nouvelEtudiant = {
            ...req.body,
            ...{
                // Assurez-vous que l'ID est unique, prenez le max existant + 1
                id: etudiants.length > 0 ? Math.max(...etudiants.map(e => e.id)) + 1 : 1,
                created: new Date().toISOString() // Format ISO pour la date
            }
        };
        console.log('Nouvel étudiant à ajouter:', nouvelEtudiant);


        // 6) on ajoute le nouvel étudiant dans la collection des étudiants en RAM :
        etudiants.push(nouvelEtudiant);
        console.log('Nombre d\'étudiants après ajout en RAM:', etudiants.length);
       
        // 7) on fabrique une chaine JSON avec :
        // - au début la constante "const etudiants =",
        // - au milieu l'ensemble des étudiants dans la collection,
        // - à la fin la constante "n\nmodule.exports = etudiants;"
        const jsonCollectionVersChaine = JSON.stringify(etudiants, null, 2);
        const contentFinalise = `const etudiants = ${jsonCollectionVersChaine};\n\nmodule.exports = etudiants;`;


        // 8) Définir le chemin pour l'écriture sur le disque
        // C'est le même chemin absolu que pour l'invalidation du cache
        // Correction ici: Pas besoin de path.join à nouveau si vous avez déjà l'absolu.
        const mockEtudiantsCheminPourEcriture = cheminAbsoluMock;


        // 9) récrire dans le fichier mock :
        gestionnaireFic.writeFile(mockEtudiantsCheminPourEcriture, contentFinalise, 'utf8', (err) => {
            if (err) {
                console.error("Erreur lors de l'écriture dans mock-etudiants.js :", err);
                return res.status(500).json({ message: "Erreur serveur lors de l'enregistrement de l'étudiant." });
            }
            console.log("Le fichier mock-etudiants.js a été mis à jour sur le disque.");


            const message = `L'étudiant(e) ${nouvelEtudiant.firstname} a bien été créé.`;
            res.status(201).json({ message, data: nouvelEtudiant });
        });
    });
};

