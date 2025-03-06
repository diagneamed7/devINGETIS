#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv, char **arge) {
    // Définir la variable d'environnement (avec écrasement)
    if(setenv("Code", "777", 1) != 0) {
        perror("Erreur lors de la création de la variable d'environnement");
        return 1;
    }

    printf("Variable 'Code' définie : %s\n", getenv("Code"));

    // Vérifier qu'un argument a été fourni
    if (argc < 2) {
        printf("Erreur: Aucun argument fourni.\n");
        return 1;
    }

    // Vérifier la variable d'environnement "Code"
    char *expected_code = "777";
    char *code_value = getenv("Code");

    if (code_value == NULL || strcmp(code_value, expected_code) != 0) {
        printf("Erreur: La variable d'environnement 'Code' doit être définie à '777'.\n");
        return 1;
    }

    printf("Succès: Programme exécuté avec l'argument '%s' et Code=777 en mémoire.\n", argv[1]);
    return 0;
}
