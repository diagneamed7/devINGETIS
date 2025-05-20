package Vue;

import entity.Personne;
public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Personne personne = new Personne("Diagne","Mouhamed",23);
		Personne personne2 = new Personne("Dizgne", "Nogaye");
		
		System.out.println("Voici le compteur: "+ personne.getCompteur() + " \n le nom:"+personne.getNom()+
				"\nle prenom :" +personne.getPrenom()+ "\nl'age: "+personne.getAge());
		
			personne2.setPrenom("Assane");
		
		System.out.println("Voici le nom:"+personne2.getNom()+
				"\nle prenom :" +personne2.getPrenom());
	}

}
