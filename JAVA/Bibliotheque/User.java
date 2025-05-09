
import java.util.ArrayList;

public class User {
    private String nom;
    private int num;
    private ArrayList<Livre> livreEmpruntes;

    public User(String nom, int num) {
        this.nom = nom;
        this.num = num;
        this.livreEmpruntes = new ArrayList<>();
    }

    public String getNom() {
        return nom;
    }

    public int getNum() {
        return num;
    }

    public ArrayList<Livre> getLivreEmprunte() {
        return livreEmpruntes;
    }

    public void emprunterLivre(Livre livre) {
        livreEmpruntes.add(livre);
        livre.emprunter();
    }

    public void retournerLivre(Livre livre) {
        livreEmpruntes.remove(livre);
        livre.retourner();
    }

    @Override
    public String toString() {
        return "Nom :" + nom + "| identifiant :" + num + "| Livres emprunté :" + livreEmpruntes.size();
    }

}
