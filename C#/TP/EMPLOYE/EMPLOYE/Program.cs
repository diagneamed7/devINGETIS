using EMPLOYE.GestionEmploye;

internal class Program
{
    private static void Main(string[] args)
    {
        Employe employe = new Employe
        {
            Id = 1,
            Nom = "Ahmed B.",
            Poste = "Développeur",
            SalaireMensuel = 2500
        }; employe.AfficherDetails();
    }
}