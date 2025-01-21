internal class Program
{
    private static void Main(string[] args)
    {
        double Addition(double x, double y)
        {
            return x + y;
        }
        double Soustraction(double x, double y)
        {
            return x - y;
        }

        double Multiplication(double x, double y)
        {
            return x * y;
        }

        double Division(double x, double y)
        {
            if( x ==0 || y == 0)
            {
                Console.WriteLine("Un nombre ne peut pas etre diviser par zero");
            }
            return x / y;
        }




        Console.WriteLine("Bienvenue dans notre Calculatrice");
        Console.WriteLine("Entrer le premier nombre");
        string n1 = Console.ReadLine();
        Console.WriteLine("Que voulez vous faire ?" +
            "1) pour addition " +
            "2) pour soustraction" +
            "3) pour multiplication" +
            "4)pour division");
         string op  = Console.ReadLine();

        Console.WriteLine("Donner le deuxieme nombre");
        string n2 = Console.ReadLine();

       
        //if (op == "1")
        //{
        //    Console.WriteLine(Addition(double.Parse(n1), double.Parse(n2)));
        //}
        switch (op)
        {
            case "1":
                Console.WriteLine(Addition(double.Parse(n1), double.Parse(n2)));
                break;
            case "2":
                Console.WriteLine(Soustraction(double.Parse(n1), double.Parse(n2)));
                break;
            case "3":
                Console.WriteLine(Multiplication(double.Parse(n1), double.Parse(n2)));
                break;
            case "4":
                Console.WriteLine(Division(double.Parse(n1), double.Parse(n2)));
                break;
        }
    }
}