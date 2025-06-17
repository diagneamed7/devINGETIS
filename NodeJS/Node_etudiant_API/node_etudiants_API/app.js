//======================================================
//API qui gére les étudiants 
//======================================================
//=======================================================
// Etape 1 : charger modules, frameworks à utliser
const express = require('express');
//les entrantes vers l'API
let etudiants = require('./src/db/mock-etudiants.js');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // pour logger les requêtes HTTP
const cors = require('cors'); // pour gérer les CORS (Cross-Origin Resource Sharing)
// Etape 2 : On déclare l'API
//on crée une instance de notre api
const app = express();
const port = 3000;

//Etape 3 : On charge les middlewares
app
.use(cors()) //pour autoriser les requêtes CORS pour que le navigateur puisse accéder à l'API
.use(bodyParser.json()) //pour parser le corps de la requete
.use(morgan('dev')); //pour logger les requêtes HTTP dans la console

// endpoint :racine:
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API gestion des étudiants et content de vous revoir!!!!!!!!!!');
});

//REFERENCIE :
//=========================================================
//Etape 4 : On définir les routes(endpoints) :version JSON
//==========================================================
/*
// endpoint :liste des étudiants:
const listeEtudiants = require('./src/routes/findAllEtudiantsJSON');
listeEtudiants(app);
// endpoint :Chercher un étudiant:
const FindUnEtudiant = require('./src/routes/findUnEtudiantJSON');
FindUnEtudiant(app);
// endpoint :ajouter un étudiant:
const addUnEtudiant = require('./src/routes/addUnEtudiantJSON');
addUnEtudiant(app);
// endpoint : modifier un étudiant:
const updateUnEtudiant = require('./src/routes/updateUnEtudiantJSON');
updateUnEtudiant(app);

// endpoint :supprimer un étudiant:
const deleteUnEtudiant = require('./src/routes/deleteUnEtudiantJSON');
deleteUnEtudiant(app);  
*/
//REFERENCIE :
//=========================================================
//Etape 4 : On définir les routes(endpoints) :version SQL
//==========================================================
/*
// endpoint :liste des étudiants:
const findTousLesEtudiantsSQL = require('./src/routes/findTousLesEtudiantsDb_SQL');
findTousLesEtudiantsSQL(app);

// endpoint :Chercher un étudiant:
const findUnEtudiantSQL = require('./src/routes/findUnEtudiantDb_SQL');
findUnEtudiantSQL(app);

// endpoint :ajouter un étudiant:
const addUnEtudiantSQL = require('./src/routes/addUnEtudiantBd_SQL');
addUnEtudiantSQL(app);

//endpoint : modifier un étudiant:
const updateUnEtudiantSQL = require('./src/routes/updateUnEtudiantBd_SQL');
updateUnEtudiantSQL(app);

// endpoint :supprimer un étudiant:
const deleteUnEtudiantSQL = require('./src/routes/deleteUnEtudiantBd_SQL.js');
deleteUnEtudiantSQL(app);
*/
//==========================================================
//Referencie : EndPoint Sequelize
//==========================================================

// endpoint :liste des étudiants via Sequelize
const findTousLesEtudiantsSeq = require('./src/routes/findTousLesEtudiantsDb_Seq');
findTousLesEtudiantsSeq(app);

// endpoint :chercher un étudiant via Sequelize
const findUnEtudiantSeq = require('./src/routes/findUnEtudiantBd_Seq');
findUnEtudiantSeq(app);

// endpoint: ajouter un étudiant via Sequelize
const addUnEtudiantSeq = require('./src/routes/addUnEtudiantBd_Seq');
addUnEtudiantSeq(app);

// endpoint: modifier un étudiant via Sequelize
const updateUnEtudiantSeq = require('./src/routes/updateUnEtudiantBd_Seq');
updateUnEtudiantSeq(app);

// endpoint: supprimer un étudiant via Sequelize
const deleteUnEtudiantSeq = require('./src/routes/deleteUnEtudiantBd_Seq');
deleteUnEtudiantSeq(app);

//endpoint pour le login
//    endpoint : connexion à l'API (avec gestion de token) :
const loginRoute = require('./src/routes/login2'); // Importez la NOUVELLE route de connexion
loginRoute(app); // Activez la route de connexion










//    +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//    Etape 5 : Gérer une URL fausse : code statut 404
//    +++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(({res}) => {
        const message = '404 : Ressource demandée introuvable.Essayez une autre URL.'
              res.status(404).json({message});
      });














//Notre API se met à attndre sur le port 3000
app.listen(port, () => {
    console.log(`API est démarrée sur http://localhost:${port}`);
});







