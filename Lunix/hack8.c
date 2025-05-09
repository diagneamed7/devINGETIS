#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>

#define PARENT_READ_SIZE 32
#define CHILD_READ_SIZE 16

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <fichier>\n", argv[0]);
        return EXIT_FAILURE;
    }

    // Ouverture du fichier en lecture seule
    int fd = open(argv[1], O_RDONLY);
    if (fd == -1) {
        perror("Erreur lors de l'ouverture du fichier");
        return EXIT_FAILURE;
    }

    char parent_buffer[PARENT_READ_SIZE + 1] = {0}; // +1 pour le '\0' (sécurité)
    char child_buffer[CHILD_READ_SIZE + 1] = {0};

    // Le parent lit les 32 premiers caractères
    ssize_t parent_bytes = read(fd, parent_buffer, PARENT_READ_SIZE);
    if (parent_bytes == -1) {
        perror("Erreur de lecture du parent");
        close(fd);
        return EXIT_FAILURE;
    }
    printf("[PARENT] A lu : %s\n", parent_buffer);

    // Création du processus enfant
    pid_t pid = fork();

    if (pid < 0) {
        perror("Erreur de fork");
        close(fd);
        return EXIT_FAILURE;
    }

    if (pid == 0) {  // Processus enfant
        ssize_t child_bytes = read(fd, child_buffer, CHILD_READ_SIZE);
        if (child_bytes == -1) {
            perror("[ENFANT] Erreur de lecture");
        } else {
            printf("[ENFANT] A lu : %s\n", child_buffer);
        }
        close(fd);
        exit(0);
    } else {  // Processus parent
        wait(NULL);  // Attend la fin de l'enfant
        close(fd);
    }

    return EXIT_SUCCESS;
}
