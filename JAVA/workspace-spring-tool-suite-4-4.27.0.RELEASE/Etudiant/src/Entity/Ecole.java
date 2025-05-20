package Entity;

import java.util.ArrayList;
import java.util.List;

public class Ecole {
	private String nom;
	private String adresse;
	private List<Etudiants> etudiants;
	
	public Ecole(String nom, String adresse) {
		super();
		this.nom = nom;
		this.adresse = adresse;
		this.etudiants = new ArrayList<>();
	}
	public String getNom()
	{
		return nom;
	}
	public void setNom(String nom){
		this.nom = nom;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public List<Etudiants> getEtudiants() {
		return etudiants;
	}
	
	public void AjoutEtudiant(Etudiants etudiant) 
	{
		etudiants.add(etudiant);
	}
	
	
}
