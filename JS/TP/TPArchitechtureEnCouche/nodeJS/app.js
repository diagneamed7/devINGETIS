const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/auth');

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cookieParser());
app.use(csrf({ cookie: true })); // Protection CSRF

// Middleware global pour CSRF
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // pour Ajouter du token CSRF aux vues
    next();
});
//Pour afficher la vue dés le lancement du projet 
app.get('/', (req, res) => {
    res.render('Acceuil');
});


// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

// Démarrage du serveur
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
