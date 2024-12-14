// Import des modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); 
const app = express();
const PORT = 3000;
// Configurer le middleware pour le JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require('./db');
 //pour inclure les vue
 app.set('view engine', 'ejs');
 const productRoutes = require('./routes/products');
app.use('/products', productRoutes)

 
 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); });
    