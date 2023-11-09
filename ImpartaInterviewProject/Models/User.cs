using System;

namespace ImpartaInterviewProject.Models
{
	public class User
	{
		public Guid ID { get; set; }
		
		public string Firstname { get; set; }

		public string Surname { get; set; }

		public string Email { get; set; }

		public string EmailHash { get; set; }

		public string Password { get; set; }

		public string PhotoFileName	{ get; set; }
	}
}
