using System;
namespace TPCOMPTE1.Entity
{
	public class Mouvement
	{
		private float montant;
		private string libelle;
		public Mouvement(float montant, string libelle)
		{
			this.montant = montant;
			this.libelle = libelle;
		}

		public float Montant
		{
			get { return montant; }
			set { montant = value; }
		}
		public string Libelle
		{
			get { return libelle; }
			set { libelle = value; }
		}
	}
}

