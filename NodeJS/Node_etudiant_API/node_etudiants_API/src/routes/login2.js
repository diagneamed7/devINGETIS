// ============================================
// Endpoint d'authentification : user + mot de passe
// Version 2 : on
//              1) On vérifle user et le password
//              2) On génére un token utilisable par les autres
//                  Endpoints
// ===========================================
// On demande à se connecter à la BD :
//     En utilisant la table SQL "users" représentée
//      par le modèle User :
const { User } = require('./ConnexionBD_Seq');
// On utilise "bcrypt" pour hacher les mots de passe
const bcrypt = require('bcrypt');
// On utilise "jsonwebtoken" pour générer les tokens JWT
const jwt = require('jsonwebtoken');
// On importe la clé secrète pour signer les tokens
const cleSecrete = require('../auth/private_key'); // Assurez-vous que le chemin est correct


module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        // On récupère de la requête le username et le password :
        // RAPPEL : POUR TESTER CE ENDPOINT : utiliser
        // INSOMNIA avec requete POST et body en JSON :
        const { username, password } = req.body;


        // 1. Vérification des champs manquants
        if (!username || !password) {
            const message = 'Veuillez fournir un nom d\'utilisateur et un mot de passe.';
            return res.status(400).json({ message });
        }


        try {
            // 2. Recherche user dans la BD :
            const user = await User.findOne({ where: { username: username } });


            // 3. Si User n'existe pas :
            if (!user) {
                const message = 'user et/ou password incorrects.';
                return res.status(401).json({ message });
            }


            // 4. Si user 'admin' existe avec password null :
            //    càd 1ere connexion : on prend le password passé
            if (user.username === 'admin' && user.password === null) {
                // Hacher le nouveau password avant de l'enregistrer
                const hashedPassword = await bcrypt.hash(password, 10);
               
                // On update la BD :
                await user.update({ password: hashedPassword });


                // On génèren le TOKEN pour le user "admin":
                const token = jwt.sign(
                    { userId: user.id, username: user.username },
                    cleSecrete,
                    { expiresIn: '1h' } // Le token expire après 1 heure
                );
                const message = 'Mot de passe administrateur initialisé et connexion réussie !';
                 // on renvoie le Token à l'appli cliente :
                return res.status(200).json({ message, data: { username: user.username, token: token } });
            }


            // 5. Cas général : user existe et a un password :
            //    On compare le mot de passe transmis au mot de passe de la BD :
            const passwordIsValid = await bcrypt.compare(password, user.password);
            // La variable "passwordIsValid" contient true ou false :


            if (passwordIsValid) {
                // On génére le TOKEN pour l'utilisateur
                const token = jwt.sign(
                    { userId: user.id, username: user.username },
                    cleSecrete,
                    { expiresIn: '1h' } // Le token expire après 1 heure
                );


                const message = 'Connexion réussie !';
                // on renvoie le Token à l'appli cliente :
                return res.status(200).json({ message, data: { username: user.username, token: token } });
            } else {
                const message = 'Nom d\'utilisateur ou mot de passe incorrect.';
                return res.status(401).json({ message });
            }


        } catch (error) {
            console.error('Erreur lors de la tentative de connexion :', error.message);
            const message = 'Erreur serveur lors de la connexion.';
            res.status(500).json({ message });
        }
    });
    console.log("Route '/api/login' (POST) chargée.");
};


