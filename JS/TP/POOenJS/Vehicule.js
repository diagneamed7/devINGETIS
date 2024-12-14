class Vehicule {
    #carburant; // Propriété privée
    constructor(type, vitesseMax) {
        this.type = type; this.vitesseMax = vitesseMax; this.#carburant = 100;
    }
    afficherInfo() {
        console.log(`Type: ${this.type}, Vitesse Max: ${this.vitesseMax} km/h, Carburant: ${this.#carburant}%`);
    }
    rechargerCarburant(quantite) {
        this.#carburant = Math.min(100, this.#carburant + quantite); console.log(`Carburant rechargé à ${this.#carburant}%`);
    }
    demarrer() {
        if (this.#carburant > 0) {
            console.log(`${this.type} démarre.`);
        } else {
            console.log(`${this.type} ne peut pas démarrer car le carburant est épuisé.`);
        }
    }
}
class Voiture extends Vehicule {
    demarrer() {
        console.log(`La voiture ${this.type} démarre en douceur.`);
    }
}
class Moto extends Vehicule {
    demarrer() {
        console.log(`La moto ${this.type} démarre avec puissance.`);

    }
}
// Utilisation
const vehiculeGenerique = new Vehicule('Véhicule générique', 120); 
const voiture = new Voiture('Voiture de sportTTTTTTTT', 200);
const moto = new Moto('Moto de course', 220);
const vehicules = [vehiculeGenerique, voiture, moto];
// Affichage des informations et démarrage pour chaque véhicule 
vehicules.forEach(vehicule => {
    vehicule.afficherInfo();
    vehicule.demarrer();
});