using System;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;

namespace TEST.Entity{
    public class Personne {
        public string prenom;
         public string nom;
         

        public Personne(string prenom, string nom ){
            this.prenom = prenom;
            this.nom = nom; 
        }

   public void affichePersonne(){
        Console.WriteLine($"voici le Prenom :{prenom}" );
        Console.WriteLine($"voici le nom : {nom}" );
    }
    public int CompterPrenom(){
       int cpt = 0;
        for(int i = 0;i< prenom.Length;i++){
            cpt++;
        }
        return cpt;  
    }


    }

}