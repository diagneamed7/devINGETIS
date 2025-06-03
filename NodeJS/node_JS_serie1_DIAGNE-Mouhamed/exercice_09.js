let chaine = document.getElementById("chaine");
let button = document.getElementById("btn");
let resultat = document.getElementById("resultat");

function InverserChaine(chaine) {   
    if (typeof chaine !== "string" || chaine.trim() === "") {
        alert("Veuillez entrer une chaîne de caractères valide.");
        return;
    }
    // Inverser la chaîne de caractères
    let chaineInversee = chaine.split("").reverse().join("");
    resultat.textContent = "La chaîne inversée est : " + chaineInversee;
}
button.addEventListener("click", function(event) {
    event.preventDefault();
    InverserChaine(chaine.value);
});