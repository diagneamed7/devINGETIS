const express = require('express');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();
// Configurer EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(csrf({ cookie: true })); // Protection CSRF
// Middleware global pour injecter le token CSRF dans les vues
     app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Ajoute csrfToken à res.locals
     next();
 });
app.use('/auth', authRoutes);
// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});
