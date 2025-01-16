using System;
using System.Collections.Generic;
namespace TPCOMPTE1.Entity
{
	public class Compte
	{
		private static int cpt = 0;
		private int numCompte;
		private float solde;
		private List<Mouvement> mouvement;

		public Compte(int numCompte, float solde)
		{
			this.numCompte = cpt++;
			this.solde = solde;
			this.mouvement = new List<Mouvement>();
		}
		public int NumCompte
		{
			get { return numCompte; }
			set { numCompte = value; }
		}
		public float Solde
		{
			get { return solde; }
			set { solde = value;}
		}

		public List<Mouvement> Mouvement
		{
			get { return mouvement; }
			set { mouvement = value; }
		}

		public void affichermouvement(Mouvement mouvement)
		{
			if(mouvement.Montant<0 && solde + mouvement.Montant < 0)
			{
				Console.WriteLine("Solde insuffisant pour effectuer ce mouvment");
				return;
			}
            this.mouvement.Add(mouvement);
			solde += mouvement.Montant;
			//if (mouvement.Count>100)
			{
				this.mouvement.RemoveAt(0);
			}

        }
        public IEnumerable<Mouvement> ObtenirMouvements()
        {
            return mouvement;
        }


        public void Debiter(double s)
        {
            if (this.solde >= s)
			{
				this.solde -= (float)s;
                Console.WriteLine($"votre compte à ete debiter de {s}, nouveau solde{this.solde}");
				Mouvement Nmouv = new Mouvement((float)s,"Debiter");
				this.mouvement.Add(Nmouv);
            }
			else
			{
                Console.WriteLine("Solde insuffisant");
            }
			
			
        }
        public void Crediter(double s)
		{
			if (s > 0)
			{
				this.solde += (float)s;
				Console.WriteLine($"Votre compte vient d'etre créditer de {s}, nouveau solde{this.solde}");
				Mouvement Nmvm = new Mouvement((float)s, "Crediter");
				this.mouvement.Add(Nmvm);
			}
			else
			{
				Console.WriteLine("Saisie incorrecte");
			}
		}
	}
}

