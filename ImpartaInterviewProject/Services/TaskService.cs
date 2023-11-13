using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace ImpartaInterviewProject.Services
{
	public class TaskService : ITaskService
	{
		private readonly Context _context;

		private struct TaskData
		{
			public object Tasks { get; set; }
			public object Statuses { get; set; }
		}

		public TaskService(Context context)
		{
			_context = context;
		}

		public JsonResult CreateTask(Tasks task)
		{
			try
			{
				_context.Tasks.Add(task);
				_context.SaveChanges();
				return new JsonResult("Added task successfully");
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}		
		}

		public JsonResult GetTasksForUser(Guid id)
		{
			var tasks = _context.Tasks.Where(x => x.UserID.Equals(id));

			var statuses = tasks.GroupBy(p => p.Status)
				.Select(group => new
				{
					Status = group.Key,
					Count = group.Count()
				}).ToList();

			var resultData = new TaskData
			{
				Tasks = tasks,
				Statuses = statuses
			};

			return new JsonResult(resultData);
		}

		public JsonResult UpdateTask(Tasks updatedTask)
		{
			try
			{
				var task = GetTaskById(updatedTask.ID);
				task.Name = updatedTask.Name;
				task.Description = updatedTask.Description;
				task.Priority = updatedTask.Priority;
				task.Status = updatedTask.Status;
				task.Type = updatedTask.Type;

				_context.Tasks.Update(task);
				_context.SaveChanges();

				return new JsonResult(String.Format("Updated task {0} successfully", task.Description));
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		public JsonResult DeleteTask(int id)
		{
			try
			{
				var task = GetTaskById(id);
				var taskDescription = task.Description;

				_context.Tasks.Remove(task);
				_context.SaveChanges();

				return new JsonResult(String.Format("Deleted task {0} successfully", taskDescription));
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
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
