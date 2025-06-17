//      ====================================
//      Ceci est un middleware :
//      Vérification du Token reçu après
//      Connexion Token :
//      ====================================      
//      on va utiliser JWT : qui peremet de vérifier un token :
const jwt = require('jsonwebtoken');
//      on récupère la clé secrète
const cleSecrete = require('./private_key'); // Importe la clé secrète


// Ce middleware  prend 3 paramètres :  (req, res, next)
module.exports = (req, res, next) => {
    //  on récupère l'êntête de la requête reçue :
    //  c'est dans cette entête que se trouve le Token :
    const enteteAutorisation = req.headers.authorization;


    // Si absence entête :
    if (!enteteAutorisation) {
        const message = `Token non fourni`;
        return res.status(401).json({ message });
    }
    // On extrait le token (on retire "Bearer ")
    const token = enteteAutorisation.split(' ')[1];


    // On vérifie la validité du token
    jwt.verify(token, cleSecrete, (error, decodedToken) => {
        // Si pb Token : token invalide, expiré, etc.
        if (error) {
            console.error('ERREUR JWT: ', error.message); // Log l'erreur complète pour plus de détails
            const message = `Token non valide ou a expiré. Veuillez vous reconnecter.`;
            return res.status(401).json({ message, error: error.message });
        }
        // on rajoute au corps de la raqueête le token ;
        //  pour qu'il puisse être utilisé dans les Endpoints
        req.auth = decodedToken;
        next();
    });
};  


