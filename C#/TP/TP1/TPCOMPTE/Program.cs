using System;
using System.Collections.Generic;
using TPCOMPTE.ENTITY;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Bienvenue dans votre App");

        Console.WriteLine("entrez le nom du client : ");
        string nom = Console.ReadLine();

        Console.WriteLine("Entrer le prenom");
        string prenom = Console.ReadLine();

        Console.WriteLine("Entrer le numero de telephone");
        string numeroTelephone = Console.ReadLine();

        Client client = new Client(nom, prenom, numeroTelephone);
        Console.WriteLine($"\nle client  creer : {client.Nom} {client.Prenom}, telephoen :{client.NumeroTelephone} ");

        
        // // Créer un compte
        
         Console.WriteLine("Entrer un motant pour le solde du compte");
         float solde = float.Parse(Console.ReadLine());
         List<Mouvement> mouvements = new List<Mouvement>();
        Compte compte = new Compte(solde,mouvements);
        // //Afficher le solde compte
        // Console.WriteLine($"Compte créé avec un solde initial de : {compte.Solde} €");

        // Mouvement mouvement1 = new Mouvement(100, "Dépôt initial");
        // Mouvement mouvement2 = new Mouvement(-50, "Retrait");
        // Mouvement mouvement3 = new Mouvement(200, "Versement");


        // // Ajouter des mouvements
        // compte.AjouterMouvement(mouvement1);
        // compte.AjouterMouvement(mouvement2);
        // compte.AjouterMouvement(mouvement3);

        // // Afficher le solde après les mouvements
        // Console.WriteLine($"Compte {compte.NumeroCompte} - Solde après mouvements : {compte.Solde}€");

        // // Afficher les mouvements du compte
        // Console.WriteLine("Mouvements effectués :");
        // foreach (var mouvement in compte.ObtenirMouvements())
        // {
        //     Console.WriteLine($"{mouvement.Libelle} : {mouvement.Montant}€");
        // }
    }
}
