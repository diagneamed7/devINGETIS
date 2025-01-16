using System;
namespace TPCOMPTE1.Entity
{
	public class Client
	{
		private string prenom;
		private string nom;
		private string numTel;

		public Client(string prenom, string nom, string numTel)
		{
			this.prenom = prenom;
			this.nom = nom;
			this.numTel = numTel;

		}
        public string Prenom
        {
            get { return prenom; }
            set { prenom = value; }
        }
        public string Nom
		{
			get {return nom;}
            set { nom = value; }
		}
		public string NumTel
		{ get { return numTel; }
			set { numTel = value; }
		}
		
	}
}

