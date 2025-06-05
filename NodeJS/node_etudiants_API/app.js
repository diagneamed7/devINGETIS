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
// Etape 2 : On déclare l'API
//on crée une instance de notre api
const app = express();
const port = 3000;

//Etape 3 : On charge les middlewares
app
.use(bodyParser.json()) //pour parser le corps de la requete
.use(morgan('dev')); //pour logger les requêtes HTTP dans la console


//

//Etape 4 : On définir les routes(endpoints)
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

// endpoint :racine:
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API gestion des étudiants et content de vous revoir!!!!!!!!!!');
});
/* 
// endpoint :reception parametres:
app.get('/:id', (req, res) => {   
    //recupération de l'id
    const idEtudiantDemande = req.params.id;
    //on renvoie de la reponse à l'appli.client
    res.send('Vous avez demandé l\'étudiant '+ idEtudiantDemande);
});

// endpoint :renvoyer liste des étudiants:
app.get('/api/etudiants', (req, res) => {   
    //on renvoie de la reponse à l'appli.client sous forme de chaine de caractères
    //res.send("Il y'a "+etudiants.length+" étudiants dans la base de données");
    //renvoyer la liste des étudiants en forme de JSON
    const message = "Il y'a "+etudiants.length+" étudiants dans la base de données";
    res.json({message:message,data:etudiants});
});

//EndPoint : Ajouter un étudiant 
app.post('/api/etudiants', (req, res) => {   
    const id = etudiants.length + 1;
    const etudiantCreated = {...req.body, ...{id: id, created: new Date()}};
    etudiants.push(etudiantCreated);
    const message = `Létudiant ${etudiantCreated.firstname} a été créé avec succès`;
    res.json({message:message, data: etudiantCreated});
});

*/

//Notre API se met à attndre sur le port 3000
app.listen(port, () => {
    console.log(`API est démarrée sur http://localhost:${port}`);
});







