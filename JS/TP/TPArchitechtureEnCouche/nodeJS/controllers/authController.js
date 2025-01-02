const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../entities/User");
const sequelize = require("../config/database");


//POUR S'INSCRIRE
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    //console.log(req.body);

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
  });
   
    res.redirect('/');
    //res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    console.error("Error during user registration:", err); // Ajout d'un log détaillé
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
  
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.cookie("jwt", token, { httpOnly: true });
        // Rediriger vers la page produit après connexion réussie
        res.redirect('/products');
   // res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
