using ImpartaInterviewProject.Models;
using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
	public Context(DbContextOptions<Context> options) : base(options)
	{
	}

	public Context() : base() { }

	public virtual DbSet<User> Users { get; set; }

	public virtual DbSet<Tasks> Tasks { get; set; }
}