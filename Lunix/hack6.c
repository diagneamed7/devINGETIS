#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 1024  // Taille du buffer de lecture

void afficher_contenu(FILE *p_file) {
    char buffer[BUFFER_SIZE];
    size_t bytes_read;

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, p_file)) > 0) {
        fwrite(buffer, 1, bytes_read, stdout);  // Écriture sur stdout (sortie standard)
    }
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <fichier1> <fichier2>\n", argv[0]);
        return 1;
    }

    FILE *file1 = fopen(argv[1], "r");
    if (file1 == NULL) {
        perror("Erreur lors de l'ouverture du premier fichier");
        return 1;
    }

    FILE *file2 = fopen(argv[2], "r");
    if (file2 == NULL) {
        perror("Erreur lors de l'ouverture du deuxième fichier");
        fclose(file1);  // Fermer le premier fichier avant de quitter
        return 1;
    }

    // Afficher le contenu des deux fichiers
    afficher_contenu(file1);
    afficher_contenu(file2);

    // Fermer les fichiers
    fclose(file1);
    fclose(file2);

    return 0;
}
