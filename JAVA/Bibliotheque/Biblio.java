
import java.util.ArrayList;

public class Biblio {
    private ArrayList<Livre> livres;
    private ArrayList<User> users;

    public Biblio() {
        this.livres = new ArrayList<>();
        this.users = new ArrayList<>();
    }

    public void ajouterLivre(Livre livre) {
        livres.add(livre);
    }

    public void ajouterUser(User user) {
        users.add(user);
    }

    public Livre rechercherLivrepIsbn(String isbn) {
        for (Livre livre : livres) {
            if (livre.getIsbn().equalsIgnoreCase(isbn)) {
                return livre;
            }
        }
        return null;
    }

    public User rechercherUsreparNum(int num) {
        for (User user : users) {
            if (user.getNum() == num) {
                return user;
            }
        }
        return null;
    }

    public void afficherLivre() {
        if (livres.isEmpty()) {
            System.out.println("Aucun livre n'est disponible");
        } else {
            for (Livre livre : livres) {
                System.out.println(livre);
            }
        }
    }

    public void afficheruser() {
        if (users.isEmpty()) {
            System.out.println("Aucun Users n'est disponible");
        } else {
            for (User user : users) {
                System.out.println(user);
            }
        }
    }
}
