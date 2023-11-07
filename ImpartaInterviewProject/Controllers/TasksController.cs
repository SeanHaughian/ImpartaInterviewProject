using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

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
			try
			{
				_context.Tasks.Add(task);
				_context.SaveChanges();
				return new JsonResult("Added task successfully");
			}
			catch (Exception e) {
				throw new Exception(e.ToString());
			}
		}

		[HttpPut]
		public JsonResult Put(Tasks updatedTask)
		{
			try
			{
				var task = GetTaskByDescription(updatedTask.Description);
				task.Description = updatedTask.Description;
				task.Priority = updatedTask.Priority;
				task.Status = updatedTask.Status;
				task.Type = updatedTask.Type;

				_context.Tasks.Update(task);
				_context.SaveChanges();

				return new JsonResult(String.Format("Updated task {0} successfully", task.Description));
			} catch(Exception e)
			{
				throw new Exception(e.ToString());
			}	
		}

		[HttpDelete]
		public JsonResult Delete(int id)
		{
			try
			{
				var task = GetTaskById(id);
				var taskDescription = task.Description;

				_context.Tasks.Remove(task);
				_context.SaveChanges();

				return new JsonResult(String.Format("Deleted task {0} successfully", taskDescription));
			} catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		private Tasks GetTaskByDescription(string description)
		{
			return _context
				.Tasks
				.Where(x => x.Description == description)
				.FirstOrDefault();
		}

		private Tasks GetTaskById(int id)
		{
			return _context
				.Tasks
				.Where(x => x.ID == id)
				.FirstOrDefault();
		}
	}
}
