import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FilmsStream {

    public static void main(String[] args) {
        Stream<String> stream;
        Map<String, List<String>> map;

        try {
            // Lire le fichier films.txt (chemin relatif depuis le dossier de lancement)
            stream = Files.lines(Paths.get("../donnees/films.txt"));

            // Créer une map : titre de film -> liste d'acteurs
            map = stream.map(line -> line.split(";"))
                    .collect(Collectors.toMap(
                            parts -> parts[0], // Titre du film
                            parts -> Arrays.asList(parts).subList(1, parts.length) // Liste des acteurs
                    ));

            System.out.println("🎬 Liste des films et leurs acteurs :");
            map.forEach((film, acteurs) -> {
                System.out.println("- " + film + " : " + acteurs);
            });

            // Liste des 50 premiers acteurs uniques
            System.out.println("\n👥 Les 50 premiers acteurs uniques :");
            map.values().stream()
                    .flatMap(List::stream)
                    .distinct()
                    .limit(50)
                    .forEach(System.out::println);

            // Nombre total d'acteurs uniques
            long totalActeursUniques = map.values().stream()
                    .flatMap(List::stream)
                    .distinct()
                    .count();

            System.out.println("\n📊 Nombre total d'acteurs uniques : " + totalActeursUniques);

            // Nombre total de participations (incluant les doublons)
            long totalParticipations = map.values().stream()
                    .flatMap(List::stream)
                    .count();

            System.out.println("🎭 Nombre total de participations (tous films confondus) : " + totalParticipations);

            // Acteurs les plus présents
            Map<String, Long> acteursCount = map.values().stream()
                    .flatMap(List::stream)
                    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

            System.out.println("\n🏆 Acteurs les plus présents (top 5) :");
            acteursCount.entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .limit(5)
                    .forEach(entry -> System.out
                            .println(entry.getKey() + " a joué dans " + entry.getValue() + " film(s)"));

        } catch (IOException e) {
            System.err.println("Erreur lors de la lecture du fichier : " + e.getMessage());
        }
    }
}
