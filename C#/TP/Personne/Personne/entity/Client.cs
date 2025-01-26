using System;
namespace Personne.entity
{
	public class Client : PersoneT
	{
		protected int leCode {get; set;}

		public Client(string leNom, string lePrenom, string lePwd, int leCode) : base(leNom,lePrenom,lePwd)
		{
			leCode = this.leCode;
		}
	}
}

