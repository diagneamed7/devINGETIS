using System;

namespace PLLOY.entity
{
    class Message
    {
        public string contenu { get; set; }

        public string afficher()
        {
            return "Le message est : " + this.contenu;
        }

        public virtual string quisuisje() // Virtual pour supporter l'override
        {
            return "je suis message";
        }
    }
}