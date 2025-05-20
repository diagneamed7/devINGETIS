package Entity;

public class Personne {
	private String nom; 
	private String prenom;
	private int age;
	private static int compteur = 0;
	
	public Personne(String nomN, String prenomP, int ageA){
		nom = nomN;
		prenom = prenomP;
		age = ageA;
		compteur ++;
	}
	public Personne(String nom, String prenom)
	{
		this.nom =nom;
		this.prenom = prenom;
	}
	
	
	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	public int getCompteur(){
		return compteur;
	}
	public void setCompteur(int compteur){
		Personne.compteur = compteur;
	}
	
	@Override
	public String toString() {
		String resultat = "";
		resultat += "\n Nom: "+ nom;
		resultat += "\nPrénom : " + prenom ;
		resultat += "\nAge : " + age ;
		return resultat ;
	}
	
	
	
	
	
	
	
	
	
}
