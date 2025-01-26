using System;
namespace Personne.entity
{
	public class PersoneT
	{
        private string nom;
        private string prenom;
        private string pwd;

		public PersoneT()
		{
            nom = "";
            prenom = "";
            pwd = "";
        }
		public PersoneT(string leNom, string lePrenom, string lePwd)
        {
            nom = leNom;
            prenom = lePrenom;
            pwd = lePwd;
        }

        public string leNom
        {
            get { return nom; }
            set { nom = value;}
        }
        public string lePrenom
        {
            get { return prenom; }
            set { prenom = value; }
        }
        public string lePwd
        {
            get { return pwd; }
            set { pwd = value; }
        }

	}
}

