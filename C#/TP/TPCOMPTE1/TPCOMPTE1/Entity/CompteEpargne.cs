using System;
namespace TPCOMPTE1.Entity
{
	public class CompteEpargne : Compte
	{
		private float tauxInt;
		private float montInt;
		const float taux = 1.30f;
		public CompteEpargne(int NumCompte, float Solde, float montInt) : base(NumCompte, Solde)
		{
			this.tauxInt = taux;
			this.montInt = montInt;

		}
		public float TauxInt
		{
			get { return tauxInt; }
			set { tauxInt = value; }
		}
		public float MontInt
		{
			get { return montInt; }
			set { montInt = value; }
		}

		public float calculIntCourant()
		{
			MontInt = Solde * (this.TauxInt / 100);
			return MontInt;
		}

	}

}