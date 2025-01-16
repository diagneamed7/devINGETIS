using System;
namespace EMPLOYE.GestionEmploye
{
    public partial class Employe
    {
        public void AfficherDetails()
        {
            Console.WriteLine($"ID: {Id}");
            Console.WriteLine($"Nom: {Nom}");
            Console.WriteLine($"Poste: {Poste}");
            Console.WriteLine($"Salaire Mensuel: {SalaireMensuel} €");
            Console.WriteLine($"Salaire Annuel: {CalculerSalaireAnnuel()} €");
        }
    }
}
