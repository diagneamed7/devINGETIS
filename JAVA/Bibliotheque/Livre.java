public class Livre {
    private String auteur;
    private String titre;
    private String isbn;
    private Boolean dispo;

    public Livre(String auteur, String titre, String isbn, boolean dispo) {
        this.auteur = auteur;
        this.titre = titre;
        this.isbn = isbn;
        this.dispo = true;
    }

    public String getAuteur() {
        return auteur;
    }

    public String getTitre() {
        return titre;
    }

    public String getIsbn() {
        return isbn;
    }

    public boolean getDispo() {
        return dispo;
    }

    public void emprunter() {
        this.dispo = false;
    }

    public void retourner() {
        this.dispo = true;
    }

    @Override
    public String toString() {
        return "Titre: " + titre + " | Auteur: " + auteur + " | ISBN: " + isbn +
                " | Disponible: " + (dispo ? "Oui" : "Non");
    }
}
