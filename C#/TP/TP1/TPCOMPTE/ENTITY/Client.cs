namespace TPCOMPTE.ENTITY
{
    internal class Client
    {
        private string nom;
        private string prenom;
        private string numeroTelephone;

        public Client(string nom, string prenom, string numeroTelephone)
        {
            this.nom = nom;
            this.prenom = prenom;
            this.numeroTelephone = numeroTelephone;
        }

        public string Nom
        {
            get { return nom; }
            set { nom = value; }
        }

        public string Prenom
        {
            get { return prenom; }
            set { prenom = value; }
        }

        public string NumeroTelephone
        {
            get { return numeroTelephone; }
            set { numeroTelephone = value; }
        }
    }
}
