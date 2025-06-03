
let div = document.getElementById("ma_div");
// Affiche innerHTML et outerHTML dans la page
let affichage = document.getElementById("affichage");
affichage.innerHTML =
  "<strong>innerHTML :</strong><br>" +
  div.innerHTML +
  "<br><br>" +
  "<strong>outerHTML :</strong><br>" +
  div.outerHTML;
