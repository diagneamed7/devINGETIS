const express = require("express");
const app = express();
const productRoutes = require("./routes/ProductRoutes");
const categoryRoutes = require("./routes/CategorieRoutes");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
