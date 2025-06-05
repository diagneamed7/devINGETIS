
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupération des valeurs
    const genre = document.getElementById("genre").value;
    const nom = document.getElementById("name").value;
    const prenom = document.getElementById("prenom").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const adresse = document.getElementById("adresse").value;
    const postal = document.getElementById("postal").value;
    const city = document.getElementById("city").value;
    const pays = document.getElementById("pays").value;

    // Récupération des formations cochées
    const formations = Array.from(document.querySelectorAll('input[name="formation"]:checked'))
        .map(cb => cb.value)
        .join(", ");

    // Construction du récapitulatif
    let recap = `
        <h2>Récapitulatif</h2>
        <ul>
            <li><strong>Genre :</strong> ${genre}</li>
            <li><strong>Nom :</strong> ${nom}</li>
            <li><strong>Prénom :</strong> ${prenom}</li>
            <li><strong>Date de naissance :</strong> ${birthdate}</li>
            <li><strong>Email :</strong> ${email}</li>
            <li><strong>Adresse :</strong> ${adresse}</li>
            <li><strong>Code postal :</strong> ${postal}</li>
            <li><strong>Ville :</strong> ${city}</li>
            <li><strong>Pays :</strong> ${pays}</li>
            <li><strong>Formations :</strong> ${formations || "Aucune"}</li>
        </ul>
    `;
    document.getElementById("recap").innerHTML = recap;
});
