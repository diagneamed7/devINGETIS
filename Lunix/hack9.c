#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define MAX_DUPLICATIONS 100  // Nombre maximal de duplications

void fork_bomb(int count) {
    if (count >= MAX_DUPLICATIONS) {
        printf("[PROCESS %d] Limite atteinte, arrêt de la création de processus.\n", getpid());
        return;
    }

    printf("[PARENT %d] Génération d'un processus enfant...\n", getpid());

    pid_t pid = fork();

    if (pid < 0) {
        perror("Erreur lors du fork");
        return;
    }

    if (pid == 0) {  // Processus enfant
        printf("[ENFANT %d] Je suis né de %d\n", getpid(), getppid());
        sleep(1);  // Pause pour observer l'évolution
        fork_bomb(count + 1);  // L'enfant crée à son tour un enfant
        exit(0);  // L'enfant meurt après avoir généré son propre enfant
    } else {  // Processus parent
        sleep(2);  // Pause pour visualiser l'effet en "cascade"
        printf("[PARENT %d] Fin du processus parent.\n", getpid());
        wait(NULL);  // Attend la fin de l'enfant pour éviter les zombies
    }
}

int main() {
    printf("[START] Processus initial PID: %d\n", getpid());
    fork_bomb(0);  // Lancement de la fork bomb contrôlée
    return 0;
}
