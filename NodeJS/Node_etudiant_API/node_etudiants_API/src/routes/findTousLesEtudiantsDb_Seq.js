// src/routes/findTouslesEtudiantsBD_Seq.js


// Importe le modèle Etudiant à partir de notre configuration de connexion Sequelize
const { Etudiant } = require('./ConnexionBD_Seq');
const { Op } = require('sequelize'); // Importe les opérateurs Sequelize pour les requêtes

module.exports = (app) => {
    // Définit un endpoint GET pour récupérer tous les étudiants via Sequelize
    // La route est /api/etudiants_seq pour la distinguer de la version SQL brute
    app.get('/api/etudiants', async (req, res) => {
        try {
            // Utilise la méthode 'findAll' du modèle Sequelize pour récupérer tous les enregistrements de la table 'etudiants'
           /*
            const etudiants = await Etudiant.findAll();
            console.log('Données des étudiants récupérées avec succès (Sequelize).');
            // Renvoie la liste des étudiants au format JSON avec un statut 200 (OK)
            res.status(200).json(etudiants);
            */
             //  ===============================================
            //  on déclare une collection (un tableau) pour recevoir
            //  les étudiants depuis la BD
            let etudiants;
            //  Est ce que l'URL souhaite recherche les étudiants
            //  par le nom ? ou elle veut tous les étudiants
            if (req.query.name) {       // y a t il un paramètre de transmis
                // le param dans l'url doit être nommé "name" :
                //  ex : api/etudiants?name=Dupont
                const name=req.query.name;
                //
                // requête à la BD : recherche exacte
                //      version 1 : avec ":"
               //  return Etudiant.findAll({where: {lastname: name}})
                //
                // requête à la BD : recherche exacte
                //      version 2 : recherche avec opérateur : OP
                //          voir require() plus haut :
                /*
                return Etudiant.findAll({
                    where: {
                        lastname: {
                            [Op.eq]: name
                        }
                    }
                })
                */
                 // requête à la BD : recherche générique
                //      version 3 : OP et % :
                //        
                /*
                 return Etudiant.findAll({
                    where: {
                        lastname: {
                            [Op.like]: '%'+name+'%'
                        }
                    }
                })
                */
                // requête à la BD : recherche générique
                //      version 4 : OP et %  et order by et limit :
                //      nbre de lignes résultats fournis dans l'urL sinon 4 :
                
                const maxLignes=parseInt(req.query.limite) || 4;
                 return Etudiant.findAll({
                    where: {
                        lastname: {
                            [Op.like]: '%'+name+'%'
                        }
                    },
                        order: ['id'],
                        limit: maxLignes
                })    
                .then(etudiants => {
                    const message = etudiants.length+' etudiants correspondants.'
                    res.json({ message, data: etudiants })
                })
                 

            }
            else {
                // L'url n'a pas transmis de params : demande tous les étudiants
             etudiants = await Etudiant.findAll();
            };
            console.log('Données des étudiants récupérées avec succès (Sequelize).');
            // Renvoie la liste des étudiants au format JSON avec un statut 200 (OK)
            res.status(200).json(etudiants);


       

        } catch (error) {
            // En cas d'erreur (problème de connexion, erreur Sequelize, etc.), on log l'erreur pour le débogage
            console.error('Erreur lors de la récupération des étudiants (Sequelize) :', error.message);
            // Renvoie un statut 500 (Internal Server Error) à l'application cliente
            res.status(500).json({ message: 'Erreur serveur lors de la récupération des étudiants (Sequelize).' });
        }
    });
    // Message de confirmation au démarrage de l'application que cette route est chargée
    console.log("Route '/api/etudiants_seq' (GET) chargée (Sequelize).");
};





