const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware pour gérer la méthode _method
app.use(methodOverride('_method'));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

app.get('/', (req, res) =>{
    res.redirect('/products')
})



app.listen(3000, () => console.log(`Server running on port http://localhost:${3000}`));
