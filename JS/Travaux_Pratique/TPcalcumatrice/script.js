//on recupere d'abord les champs par leur id
const calculer = document.getElementById('calculer');

const ChampNombre1 = document.getElementById('nombre1');
const ChampNombre2 = document.getElementById('nombre2');
const result = document.getElementById('resultat');
function calcul(){
    const nombre1 = parseFloat(ChampNombre1.value);
    const nombre2 = parseFloat(ChampNombre2.value);
    if(isNaN(nombre1) || isNaN(nombre2)){
        result.textContent = 'saisie incorrecte';
        return;
    }else {
        const somme = nombre1 + nombre2;
        result.textContent = somme;
    }
}

calculer.addEventListener('click' ,calcul);