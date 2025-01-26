using System;
using System.Numerics;
using TPCOMPTE1.Entity;

namespace TPCOMPTE1
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Client C1 = new Client("Momo", "Diagne", "0975567");
            Console.WriteLine($"Le client vient d'etre créer avec succes {C1.Nom},{C1.Prenom},{C1.NumTel}");

            Compte compte = new Compte(0,0) ;
            Console.WriteLine($"Le compte vient d'etre creer avec succes num : {compte.NumCompte} et solde : {compte.Solde}");
            compte.Crediter(10000);
            Console.WriteLine($"Votre nouveau solde est {compte.Solde}");
            compte.Debiter(1000);
            Console.WriteLine($"Votre nouveau solde est {compte.Solde}");
            Console.WriteLine("\nMouvements effectués sur le compte :");
            foreach (var mouv in compte.ObtenirMouvements())
            {
                Console.WriteLine($"Montant : {mouv.Montant}, Libellé : {mouv.Libelle}");
            }

            // Afficher le solde final
            Console.WriteLine($"\nSolde final : {compte.Solde}");

            //Création compte épargne
            CompteEpargne Ce = new CompteEpargne(12, 34500, 0);

            Console.WriteLine($"Numéro du compte : {Ce.NumCompte}");
            Console.WriteLine($"Solde initial : {Ce.Solde} €");

            // Effectuer un dépôt
            Ce.Crediter(500.0f);
            Console.WriteLine($"Solde après dépôt : {Ce.Solde} €");

            // Calculer les intérêts
            Ce.calculIntCourant();
            Console.WriteLine($"Montant des intérêts : {Ce.MontInt} €");

            // Retirer un montant
            Ce.Debiter(700.0f);
            Console.WriteLine($"Solde après retrait : {Ce.Solde} €");

        }
  
        

    }
}