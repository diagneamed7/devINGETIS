let nombre = document.getElementById("nmbr");
let button = document.getElementById("btn");
let resultat = document.getElementById("resultat");


function ConvertirEnMinutes(valeur){
    if(isNaN(valeur) || valeur === ""){
       alert("Veuillez entrer un nombre valide.");
        return;
    }
    let secondes = parseInt(valeur) * 60;
    resultat.textContent = valeur + " minute(s) = " + secondes + " secondes.";
}

button.addEventListener("click", function(event) {
    event.preventDefault();
    ConvertirEnMinutes(nombre.value);
});