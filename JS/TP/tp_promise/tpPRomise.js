// Fonction pour mettre à jour la barre de progression
function mettreAJourProgression(pourcentage) {
    const barre = document.getElementById('progress-bar');
    barre.style.width = pourcentage + '%';
    barre.textContent = pourcentage + '%';
}

// 1. Initialisation du colis
async function initialiserColis(destinataire) {
    console.log('Votre colis est en cours de création...');
    const colis = await new Promise((resolve) => {
        setTimeout(() => {
            const colis = {
                id: Date.now(),
                destinataire: destinataire
            };
            resolve(colis);
        }, 2000);
    });
    console.log(`Votre colis a été créé, ID=${colis.id}, destinataire=${colis.destinataire}`);
    return colis;
}

// 2. Simuler les étapes de livraison
async function expedition(colis) {
    console.log('Le colis est en cours d\'expédition...');
    for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 400)); // Simule un délai
        mettreAJourProgression(i); // Met à jour la barre
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                return reject(new Error('Échec lors de l\'expédition'));
            }
            resolve('Expédition réussie');
        }, 2000);
    });
}

async function transfertRegional(colis) {
    console.log('Le colis est en cours de transfert régional...');
    for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 400)); // Simule un délai
        mettreAJourProgression(i); // Met à jour la barre
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                return reject(new Error('Échec lors du transfert régional'));
            }
            resolve('Transfert régional réussi');
        }, 2000);
    });
}

async function livraisonFinale(colis) {
    console.log('Le colis est en cours de livraison finale...');
    for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 400)); // Simule un délai
        mettreAJourProgression(i); // Met à jour la barre
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                return reject(new Error('Échec lors de la livraison finale'));
            }
            resolve('Livraison finale réussie');
        }, 2000);
    });
}

// 4. Processus global de livraison
async function suivreColis(destinataire) {
    let colis = await initialiserColis(destinataire);
    
    for (let i = 0; i < 3; i++) {
        try {
            await expedition(colis);
            await transfertRegional(colis);
            await livraisonFinale(colis);
            console.log('Le colis a été livré avec succès !');
            return;
        } catch (error) {
            console.log(error.message);
            if (i === 2) {
                console.log('Le colis n\'a pas pu être livré après plusieurs tentatives.');
            } else {
                console.log('Réessayer...');
            }
        }
    }
}

// 5. Suivre plusieurs colis en parallèle
async function suivrePlusieursColis(destinataires) {
    const promesses = destinataires.map(destinataire => suivreColis(destinataire));
    await Promise.all(promesses);
}


// Exemple d'utilisation
const destinataire = document.getElementById('text');
const btn = document.getElementById('btn');
btn.addEventListener(suivreColis(destinataire));

// Pour suivre plusieurs colis, décommentez la ligne suivante
// suivrePlusieursColis(['Mouhamed', 'Alice', 'Bob']);