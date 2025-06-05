document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let dimension = parseInt(document.getElementById("dimension").value);
    let min = parseInt(document.getElementById("valeur_minimale").value);
    let max = parseInt(document.getElementById("valeur_maximale").value);

    if (isNaN(dimension) || isNaN(min) || isNaN(max) || dimension < 1 || min > max) {
        document.getElementById("resultat").textContent = "Veuillez saisir des valeurs valides (min ≤ max, dimension ≥ 1).";
        return;
    }

    // Génération du tableau davec des  nombres aléatoires
    let tableau = [];
    for (let i = 0; i < dimension; i++) {
        let nombre = Math.floor(Math.random() * (max - min + 1)) + min;
        tableau.push(nombre);
    }

    // Calcul du nombre de colonnes (carré le plus proche)
    let cols = Math.ceil(Math.sqrt(dimension));
    let rows = Math.ceil(dimension / cols);

    // Construction du tableau HTML
    let html = "<table border='1' cellpadding='8' style='border-collapse:collapse'>";
    let index = 0;
    for (let r = 0; r < rows; r++) {
        html += "<tr>";
        for (let c = 0; c < cols; c++) {
            if (index < tableau.length) {
                html += "<td>" + tableau[index] + "</td>";
                index++;
            }
        }
        html += "</tr>";
        if (index >= tableau.length) break; // On sort après avoir fermé la dernière ligne utile
    }
    html += "</table>";

    document.getElementById("resultat").innerHTML = html;
});