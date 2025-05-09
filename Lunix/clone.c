#include<stdio.h>
#include <unistd.h>
int main()
{
    int pid_enf;
    /*identification processus et son parent*/
    printf("Futur parent pid:%d\n mon parent:%d\n", getpid(), getppid());

    pid_enf = fork();

    printf("pid:%d PPID:%d et mon proc.enfant:%d",getpid(),getppid(),pid_enf);
    if(pid_enf == 0)
    {
        printf("[%d][%d]: mon pid_enf:%d, donc je suis l'enfant\n",getpid(), getppid(),pid_enf);
    } 
    else{
        printf("[%d][%d]: mon pid_enf:%d, donc je suis le parent",getpid(), getppid(),pid_enf);
    }
return (0);
}
