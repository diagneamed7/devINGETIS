#include <stdio.h>

int main(int argc, char *argv[], char **arge)
 {
    
    printf("Nombre d'arguments : %d\n", argc);

    printf("Arguments du programme :\n");
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }

    
    printf("Variables d'environnement :\n");
    for (int i = 0; arge[i] != NULL; i++) {
        printf("arge[%d] = %s\n", i, arge[i]);
    }

    return 0;
}
