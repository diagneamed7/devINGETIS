function afficherURL() {
    // Récupère l'URL actuelle de la page
    let url = window.location.href;
    // Affiche l'URL dans le div resultat
    document.getElementById("resultat").textContent = "L'URL de cette page est : " + url;
}

document.getElementById("btn").addEventListener("click", afficherURL);