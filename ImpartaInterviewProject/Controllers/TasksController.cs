using ImpartaInterviewProject.Models;
using ImpartaInterviewProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

namespace ImpartaInterviewProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TasksController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly Context _context;
		private readonly ITaskService _taskService;
		public TasksController(IConfiguration configuration, Context context, ITaskService taskService)
		{
			_context = context;
			_configuration = configuration;
			_taskService = taskService;
		}

		[HttpGet]
		public JsonResult GetAll(Guid userID)
		{
			return _taskService.GetTasksForUser(userID);
		}

		[HttpPost]
		public JsonResult Post(Tasks task)
		{
			return _taskService.CreateTask(task);	
		}

		[HttpPut]
		public JsonResult Put(Tasks updatedTask)
		{
			return _taskService.UpdateTask(updatedTask);
		}

		[HttpDelete]
		public JsonResult Delete(int id)
		{
			return _taskService.DeleteTask(id);
		}
	}
}
