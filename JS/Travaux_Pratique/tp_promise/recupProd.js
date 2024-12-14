function fetchProductDetails(productId) {
  return new Promise((resolve, reject) => {
    //simulons un delais reseau avce setTimeout
    setTimeout(() => {
      const productDatabase = {
        1: { name: "Ordinateur portable", price: 1500 },
        2: { name: "Smartphone", price: 800 },
        3: { name: "Casque audio", price: 200 },
      };
      // Vérifie si le produit existe dans notre base de données simulée
      const product = productDatabase[productId];
      if (product) {
        resolve(product); // Résout la Promise avec les détails du produit
      } else {
        reject("Produit non trouvé"); // Rejette la Promise si l'ID est invalide
      }
    }, 1000);
  });
}
/*fetchProductDetails(4) 
    .then((product) => {
    console.log("Détails du produit :", product);
    // Affichera : "Détails du produit : { name: 'Smartphone', price: 800 }" 
    })
    .catch((error) => {
    console.error("Erreur :", error);
    // Affichera : "Erreur : Produit non trouvé" si l'ID n'existe pas
    });*/

async function getProductDetails(productId) {
  try {
    const product = await fetchProductDetails(productId);
    console.log("Détails du produit :", product);
  } catch (error) {
    console.error("Erreur :", error);
  }
}
