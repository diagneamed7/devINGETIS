 using System;
 namespace PLLOY.entity
 {
 class Email : Message
    {
        public string destinataire { get; set; }
        public string objet { get; set; }

        // Masquage intentionnel avec le mot-clé 'new'
        public new string quisuisje()
        {
            return "je suis e-mail";
        }
    }
 }