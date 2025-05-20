package Vue;

import Entity.Ecole;
import Entity.Etudiants;
public class Main {

	public static void main(String[] args) {
		
		
		Ecole ecole1 = new Ecole("Ingetis","Paris");
		Etudiants etudiant = new Etudiants("Diagne","Momo",ecole1,12);
		
		System.out.println("voici les info\nnom: "+etudiant.getNom()+
				"\n prenom: "+etudiant.getPrenom()+"\necole: "+etudiant.getEcole().getNom()
				+"\n numetudiant: "+etudiant.getNum_etudiant());
	}

}
