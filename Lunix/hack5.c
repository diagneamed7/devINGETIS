#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 1024  // Taille du buffer de lecture

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <nom_du_fichier>\n", argv[0]);
        return 1;
    }

    FILE *p_file = fopen(argv[1], "r");  // Ouvrir le fichier en mode lecture
    if (p_file == NULL) {
        perror("Erreur lors de l'ouverture du fichier");
        return 1;
    }

    char buffer[BUFFER_SIZE];
    size_t bytes_read;

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, p_file)) > 0) {
        fwrite(buffer, 1, bytes_read, stdout);  // Écrire sur la sortie standard
    }

    if (ferror(p_file)) {
        perror("Erreur de lecture");
    }

    fclose(p_file);  // Fermer le fichier
    return 0;
}
