namespace TPCOMPTE.ENTITY
{
    using System;
    using System.Collections.Generic;

    internal class Compte
    {
        private static int compteur = 1; // Compteur statique pour générer les numéros de compte uniques
        private int numeroCompte;
        private float solde;
        private List<Mouvement> mouvements;

        public Compte(float soldeInitial)
        {
            this.numeroCompte = compteur++;
            this.solde = soldeInitial;
            this.mouvements = new List<Mouvement>();
        }

        public int NumeroCompte
        {
            get { return numeroCompte; }
        }

        public float Solde
        {
            get { return solde; }
        }

        public List<Mouvement> Mouvements
        {
            get { return mouvements; }
        }

        public void AjouterMouvement(Mouvement mouvement)
        {
            if (mouvement.Montant < 0 && solde + mouvement.Montant < 0)
            {
                Console.WriteLine("Solde insuffisant pour effectuer ce mouvement.");
                return;
            }

            mouvements.Add(mouvement);  // Ajouter le mouvement à la liste
            solde += mouvement.Montant;  // Mettre à jour le solde selon le mouvement (crédit ou débit)

            // On garde seulement les 100 derniers mouvements
            if (mouvements.Count > 100)
            {
                mouvements.RemoveAt(0);
            }
        }

        public IEnumerable<Mouvement> ObtenirMouvements()
        {
            return mouvements;
        }
    }
}
