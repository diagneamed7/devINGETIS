




document.getElementById("monForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    let valeur = document.getElementById("saisie").value;
    document.getElementById("resultat").textContent = "Vous avez saisi : " + valeur;
});