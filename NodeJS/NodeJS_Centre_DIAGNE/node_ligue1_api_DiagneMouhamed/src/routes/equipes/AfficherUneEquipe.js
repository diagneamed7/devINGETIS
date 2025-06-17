const path = require("path");
const equipes = require("../../db/mock-equipes.js");

module.exports = (app) => {
    app.get("/api/equipes/:id",(req,res)=>
    {
        const idEquipeDemande = req.params.id;
        // On cherche l'équipe avec l'ID correspondant
        const equipeTrouve = equipes.find(
            (equipe) => equipe.id === idEquipeDemande
        );

        if(equipeTrouve) {
            res.json(equipeTrouve);
           console.log(`L'équipe avec l'ID ${idEquipeDemande} a été trouvée.`);
        }  else {
            res
            .status(404)
            .send("Aucune équipe trouvée avec l'ID" + idEquipeDemande);
            console.warn(`Aucun étudiant trouvé pour l'ID : ${idEquipeDemande}`);
        } 
    });
        
};