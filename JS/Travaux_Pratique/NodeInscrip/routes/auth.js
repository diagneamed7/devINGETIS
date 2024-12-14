const express = require('express');
const { register, login } = require('../controllers/authController.js');
const router = express.Router();
router.get('/register', (req, res) => { res.render('register'); 
    // Affiche la vue 
    register.ejs});
router.post('/register', register);
router.post('/login', login);
module.exports = router;
