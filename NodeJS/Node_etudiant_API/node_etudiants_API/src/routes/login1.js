//      ============================================
//      Endpoint d'authentification : user + mot de passe
//      Version 1 : on vérifie juste le user et le password
//              sans renvoyer un TOKEN.
//      ===========================================
//      On demande à se connecter à la BD :
//      En précisant l'utilisation de la table SQL
//      "users" représentée ici par le modèle User
const { User } = require('./ConnexionBD_Seq');
//      on utilise "bcrypt" pour hacher les mots de passe
const bcrypt = require('bcrypt');
//
module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        // on récupère de la requête le username et le password :
        //  RAPPEL : POUR TESTER CE EBDPOINT : utiliser
        //  INSOMNIA avec requete POST et bodey en JSON :
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
                const message = 'Nom d\'utilisateur ou mot de passe incorrect.';
                return res.status(401).json({ message }); // 401 Unauthorized
            }
            // 4. si user 'admin' existe avec password null :
            //      càd 1ere connexion : on prend le password passé
            if (user.username === 'admin' && user.password === null) {
                // Hacher le nouveau password avant de l'enregistrer
                const hashedPassword = await bcrypt.hash(password, 10); // 10 est le 'saltRounds'
                // on update la BD :
                await user.update({ password: hashedPassword });


                const message = 'Mot de passe admin modifié';
                return res.status(200).json({ message, data: { username: user.username } });
            }


            // 5. Cas général : user existe existe et a un password :
            //      on comprare le mot de passe transmis au mot de passe de la BD :
            const passwordIsValid = await bcrypt.compare(password, user.password);
            //      la variable "passwordIsValid" contient true ou false :
            if (passwordIsValid) {
                const message = 'Connexion réussie !';
                return res.status(200).json({ message, data: { username: user.username } });
            } else {
                const message = 'user et/ou password incorrects.';
                return res.status(401).json({ message });
            }


        } catch (error) {
            console.error('Problème connexion à la BD :', error.message);
            const message = 'Erreur serveur lors de la connexion.';
            res.status(500).json({ message });
        }
    });
    console.log("Endpoint :  '/api/login' (POST) connexion bien terminé");
};


