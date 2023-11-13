using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ImpartaInterviewProject.Services
{
	public interface ITaskService
	{
		JsonResult GetTasksForUser(Guid id);
		JsonResult CreateTask(Tasks task);
		JsonResult UpdateTask(Tasks updatedTask);
		JsonResult DeleteTask(int id);
	}
}