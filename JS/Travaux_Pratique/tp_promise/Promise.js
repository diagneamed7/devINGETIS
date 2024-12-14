// creer une promise

function checkUserName(name) {
  return new Promise((resolve, reject) => {
    //simuler une opération asynchrone
    setTimeout(() => {
      if (name === "Momo") {
        resolve("utilisateur trouver");
      } else {
        reject("non trouver");
      }
    }, 2000);// definir le temps d'attente
  });
}
 //Pour utiliser cette Promise, nous pouvons appeler la fonction checkUserAvailability 
 //et utiliser les méthodes .then et .catch pour gérer le succès ou l'échec.
/* checkUserName('Momo')
 
.then((message)=>{
console.log(message)// afichera le resolv
 })
 .catch((error) =>{
    console.error(error)// affichera le reject
 }
 );*/


//Async et Await pour une syntaxe plus simple
async function FindUser(name) {
    try{
        const message = await checkUserName(name);
        console.log(message);
    }
    catch(error){
        console.error(error);           
    }
}
FindUser('Momo');
