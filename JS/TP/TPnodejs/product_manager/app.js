// Import des modules
const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const PORT = '3000';
//configurer le middleware pour le JSON
app.use(express.json);
//Connnexion à la base de donnée
const db = new sqlite3.Database(`:memory:`);

//creation de la table produit

db.serialize(()=>{
db.run(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
)`);
})

//fonction pour ajouter un produit (CREATE)
function AddProduct(name,price){
    return new Promise ((resolve, reject)=>{
        const query = 'INSERT INTO TABLE product(name, price).VALUES(?,?)';
        db.run(query,[name, price],function(err){
            if (err){
                return reject(err.message);
            }
            return resolve({id:this.lastID,name,price})
        })
    }
    )
}

//fonction pour récupérer tous les produits (READ)

function getAllProducts(){
    return new Promise ((resolve, reject)=>{
       db.all('SELECT * FROM products',[],(err,rows)=>{
        if(err){
            return reject(err.message);
        }
        resolve (rows);
       });
    })
}

//fonction pour recuper un seul produit
function getByID(id){
    return new Promise((resolve, reject)=>{
        db.get('SELECT * FROM product WHERE id = ?',[],(err,rows)=>{
            if (err){
                return reject(err.message);
            }
            resolve(rows)
        })
    })
}
//fonction pour mettre à our un produit

function updateProduct(id, name,price){
 return new Promise((resolve, reject)=>{
    const query = `UPDATE SET products name =?, price=? WHERE id=?`;
    db.run(query,[id,name,price], function(err){
        if(err){
            return reject(error)
        }
        resolve(id,name,price)
    })
 })
}

//fonction pour supprimer un produit
function deleteProduct(id){
    return new Promise((resolve,reject)=>{
        const query = `DELETE FROM products WHERE id= ?`;
        db.run(query,id,function(err){
            if(err){
               return reject(err.message);
            }
            resolve('Product with ID= ${id} has been deleted');
        })
    })
}







//les routes 

//route pour ajouter un produit POST
app.post('/products',async(req, res)=>{
   const {name, price} = req.body;
   try{
    const Product = await AddProduct(name,price);
    res.status(201).json(product);
   }catch(err){
        res.status(400).json({error:err});
   }
});

//route pour recuperer tous les produits

app.get('/products', async(req,res)=>{
    try{
        const products = await getAllProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({error: err})
    }

})
//route pour mettre a jour un produit
app.put('/products/:id', async(req,res)=>{
    const{id} = req.params;
    const {name,price} = req.body;
    try{
        const product = await updateProduct(id,name,price);
        res.status(200).json(products);
    }catch(err){
        res.status(400).json({error:err});
    }
})
//route pour supprimer un pruduit 
app.delete('/products/:id', async(req,res)=>{
    const{id} = req.params;
    const {name,price} = req.body;
    try {
        const product = await deleteProduct(id);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).res.json({error:err});
    }
})
//route pour recuperer un seul produit
app.get('/products/:id', async(req,res)=>{
    const {id} = req.params;
    
    try {
        const product = await getByID(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({error: err});
    }
})


app.listen(PORT, ()=> {
    console.log(`Servor is running on http://localhost:${PORT}`);
} );
