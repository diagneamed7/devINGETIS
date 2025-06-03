window.onload = function() {
    
    let div = document.getElementById("ma_div");

   
    console.log("Attributs du div :");
    for (let attr of div.attributes) {
        console.log(attr.name + " = " + attr.value);
    }

    
    console.log("Enfants du div :");
    for (let enfant of div.childNodes) {
   
        console.log(enfant);
    }
};