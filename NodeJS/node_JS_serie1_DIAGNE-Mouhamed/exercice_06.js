let button = document.getElementById("btn");

function ChangeFong() {
  //Tableau pour stocker les couleur RGB
  let couleur = [];
  couleur[0] = Math.floor(Math.random() * 256);
  couleur[1] = Math.floor(Math.random() * 256);
  couleur[2] = Math.floor(Math.random() * 256);
  //Changer la couleur de fond du body
  document.body.style.backgroundColor =
    "rgb(" + couleur[0] + "," + couleur[1] + "," + couleur[2] + ")";
}

button.addEventListener("click", ChangeFong);
