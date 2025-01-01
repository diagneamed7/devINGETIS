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

module.exports = router;
