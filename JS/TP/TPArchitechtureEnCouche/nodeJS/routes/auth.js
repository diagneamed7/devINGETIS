const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Formulaires
router.get('/register', (req, res) => {
    res.render('register'); // `csrfToken` est injecté via `res.locals`
});

router.get('/login', (req, res) => {
    res.render('login'); // Même logique pour la vue login
});

// Soumission des formulaires
router.post('/register', register);
router.post('/login', login);
//deconnexion
router.get(('/logout'), (req,res)=>{
    req.session.destroy((err)=>{
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.status(500).send('Erreur lors de la déconnexion');
        }
        res.clearCookie('connect.sid'); // Supprime le cookie de session (si express-session est utilisé)
        res.redirect('/auth/login'); // Redirige vers la page de connexion
    });
}); 


module.exports = router;
