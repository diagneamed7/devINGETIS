using System;
using PLLOY.entity;
internal class Program
 {
        static bool verifieMessage(Message msg)
        {
            Console.WriteLine(msg.quisuisje()); // Appelle la méthode selon le type de la référence
            return !string.IsNullOrEmpty(msg.contenu); // Vérifie si contenu n'est pas vide
        }

        static void Main(string[] args)
        {
            Email mail = new Email
            {
                contenu = "Hello !",
                destinataire = "sguerfi12@yahoo.fr",
                objet = "Nouvelle"
            };

            if (verifieMessage(mail)) // Passe par une référence de type Message
            {
                Console.WriteLine(mail.quisuisje()); // Appelle la méthode de l'objet réel (Email)
                Console.WriteLine(mail.afficher());
            }

            Console.ReadKey(); // Pour garder la console ouverte
        }
    
}