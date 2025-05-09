#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

#define BUFFER_SIZE 1024  // Taille du buffer de lecture

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <nom_du_fichier>\n", argv[0]);
        return 1;
    }

    int fd = open(argv[1], O_RDONLY);  // Ouvrir le fichier en lecture seule
    if (fd == -1) {
        perror("Erreur lors de l'ouverture du fichier");
        return 1;
    }

    char buffer[BUFFER_SIZE];
    ssize_t bytes_read;

    while ((bytes_read = read(fd, buffer, BUFFER_SIZE)) > 0) {
        if (write(STDOUT_FILENO, buffer, bytes_read) != bytes_read) {
            perror("Erreur d'écriture");
            close(fd);
            return 1;
        }
    }

    if (bytes_read == -1) {
        perror("Erreur de lecture");
    }

    close(fd);  // Fermer le fichier
    return 0;
}
