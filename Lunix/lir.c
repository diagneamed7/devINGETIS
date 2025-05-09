#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>
int main(int arc, char *argv[])
{
    int no_ouv;
    no_ouv = open(argv[1], O_RDONLY);
    printf("no ouverture/Desc.: %d\n", no_ouv);
    close(no_ouv);
    return (0); /*return("EXIT_SUCCESS");*/
}
