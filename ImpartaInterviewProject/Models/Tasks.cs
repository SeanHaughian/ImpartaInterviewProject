using System;

namespace ImpartaInterviewProject.Models
{
	public class Tasks
	{
		public int ID { get; set; }

		public Guid UserID { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public string Status { get; set; }

		public string Type { get; set; }

		public string Priority { get; set; }
	}
}
