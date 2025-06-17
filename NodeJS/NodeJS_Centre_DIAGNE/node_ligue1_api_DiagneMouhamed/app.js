//======================================================
//API qui gére les équipes de la ligue 1
//======================================================
//=======================================================
// Etape 1 : charger modules, frameworks à utliser
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const equipes = require('./src/db/mock-equipes.js');
let matchs = require('./src/db/mock-matchs.js');

// Etape 2 : charger les variables d'environnement si besoin
dotenv.config();

// Etape 2 : On déclare l'API
//on crée une instance de notre api
const app = express()
const port = 3000;
//Etape 3 : On charge les middlewares
app
.use(bodyParser.json()); //pour parser le corps de la requete

//Etape 4 : On définir les routes(endpoints):

// EndPoint pour gerer l'affichage de toutes les équipes
let afficherToutesLesEquipes = require('./src/routes/equipes/AfficherTousLesEquipes.js');
afficherToutesLesEquipes(app);

// EndPoint pour gerer l'affichage d'une équipe
let afficherUneEquipe = require('./src/routes/equipes/AfficherUneEquipe');
afficherUneEquipe(app);

// EndPoint pour gerer l'ajout d'une équipe:
let ajouterUneEquipe = require('./src/routes/equipes/AjouterUneEquipe.js');
ajouterUneEquipe(app);

// EndPoint pour gerer la modification d'une équipe:
let modifierUneEquipe = require('./src/routes/equipes/ModifierUneEquipe.js');
modifierUneEquipe(app);

// EndPoint pour gerer la suppression d'une équipe:
let supprimerUneEquipe = require('./src/routes/equipes/SupprimerUneEquipe.js');
supprimerUneEquipe(app);
//======================EndPoint pour les équipes========================


//=========================EndPoint pour les matchs========================

// EndPoint pour gerer l'affichage de tous les matchs
let afficherTousLesMatchs = require('./src/routes/matches/AfficherTousLesMatchs.js');
afficherTousLesMatchs(app);

// EndPoint pour gerer l'affichage d'un match
let afficherUnMatch = require('./src/routes/matches/AfficherUnMatch.js');
afficherUnMatch(app);

// EndPoint pour gerer l'affichage d'un match par sa date
let afficherUnMatchParDate = require('./src/routes/matches/AfficherUnMatchParDate.js');
afficherUnMatchParDate(app);

//EndPoint pour gerer l'ajout d'un match
let ajouterUnMatch = require('./src/routes/matches/AjouterUnMatch.js');
ajouterUnMatch(app);

//EndPoint pour gerer la modification d'un match
let modifierUnMatch = require("./src/routes/matches/ModifierUnMatch");
modifierUnMatch(app);

//EndPoint pour supprimer un match
let supprimerUnMatch = require('./src/routes/matches/supprimerUnMatch');
supprimerUnMatch(app);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API gestion des équipes et content de vous revoir!!!!!!!!!!');
});




app.listen(port , ()=>{
    console.log(`Api est demarrer sur http://localhost:${port}`);
});