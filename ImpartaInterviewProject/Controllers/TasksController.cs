using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Linq;

namespace ImpartaInterviewProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TasksController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly Context _context;

		public TasksController(IConfiguration configuration, Context context)
		{
			_context = context;
			_configuration = configuration;
		}

		[HttpGet]
		public JsonResult GetAll()
		{
			var tasks = _context.Tasks.ToList();
			return new JsonResult(tasks);
		}

		[HttpPost]
		public JsonResult Post(Tasks task)
		{
			_context.Tasks.Add(task);
			_context.SaveChanges();
			return new JsonResult(task);
		}

		[HttpPut]
		public JsonResult Put(Tasks task)
		{
			_context.Tasks.Update(task);
			_context.SaveChanges();
			return new JsonResult(task);
		}

		[HttpDelete]
		public JsonResult Delete(int id)
		{
			var tasks = _context
				.Tasks
				.Where(x => x.ID == id)
				.FirstOrDefault();
			
			_context.Tasks.Remove(tasks);
			_context.SaveChanges();
			return new JsonResult(tasks);
		}
	}
}
