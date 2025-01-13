using TEST.Entity;

internal class Program
{
    private static void Main(string[] args)
    {
        Personne p = new Personne("Momo","Diagne");


        p.affichePersonne(); 
        Console.WriteLine(p.CompterPrenom());
    }
}