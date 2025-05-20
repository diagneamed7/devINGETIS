package Entity;

public class Etudiants extends Personne {

	private Ecole ecole;
	private static int num = 1;
	private int num_etudiant;

	public Etudiants(String nom, String prenom, Ecole ecole, int num_etudiant) {
		super(nom, prenom);
		this.ecole = ecole;
		this.num_etudiant = num_etudiant;
		num++;

	}

	public static int getNum() {
		return num;
	}

	public static void setNum(int num) {
		Etudiants.num = num;
	}

	public int getNum_etudiant() {
		return num_etudiant;
	}

	public void setNum_etudiant(int num_etudiant) {
		this.num_etudiant = num_etudiant;
	}

	public Ecole getEcole() {
		return ecole;
	}

	public void setEcole(Ecole ecole) {
		this.ecole = ecole;
	}

	@Override
	public String toString() {
		String resultat = "";
		resultat += "\nNom : " + nom;
		resultat += "\nPrénom : " + prenom;
		resultat += "\nEcole : " + ecole;
		resultat += "\nnumero etudiant  : " + num_etudiant;
		resultat += "\nnum : " + num;
		return resultat;
	}
}
