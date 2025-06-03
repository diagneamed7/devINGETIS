let nombre1 = document.getElementById("nombre1");
let nombre2 = document.getElementById("nombre2");
let button = document.getElementById("btn");
function Addition(event) {
// Pour ne pas recharger laoage jsute apres le clic
    event.preventDefault(); 
  // Récupérer les valeurs des champs de saisie
  let valeur1 = parseFloat(nombre1.value);
  let valeur2 = parseFloat(nombre2.value);
  
  // Vérifier si les valeurs sont des nombres valides
  if (isNaN(valeur1) || isNaN(valeur2)) {
    alert("Veuillez entrer des nombres valides.");
    return;
  }
  
  // Calculer la somme
  let somme = valeur1 + valeur2;
  
  // Afficher le résultat dans une alerte
 resultat.textContent = "La somme de " + valeur1 + " et " + valeur2 + " est " + somme + ".";
}
// Ajouter un écouteur d'événement pour le bouton
button.addEventListener("click", Addition);
