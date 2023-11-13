
using ImpartaInterviewProject.Controllers;
using ImpartaInterviewProject.Models;
using ImpartaInterviewProject.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection.Metadata;
using System.Xml.Linq;

namespace ImpartaInterviewProjectTests
{
	public class Tests
	{
		private TaskService tasksService;
		IQueryable<Tasks> tasks;
		Mock<Microsoft.EntityFrameworkCore.DbSet<Tasks>> mockSet;

		[SetUp]
		public void Setup()
		{
			tasks = GetFakeEmployeeList().AsQueryable();

			mockSet = new Mock<Microsoft.EntityFrameworkCore.DbSet<Tasks>>();


			mockSet.As<IQueryable<Tasks>>().Setup(m => m.Provider).Returns(tasks.Provider);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.Expression).Returns(tasks.Expression);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.ElementType).Returns(tasks.ElementType);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.GetEnumerator()).Returns(() => tasks.GetEnumerator());

			var mockContext = new Mock<Context>();
			mockContext.Setup(c => c.Tasks).Returns(mockSet.Object);

			tasksService = new TaskService(mockContext.Object);
		}

		private static List<Tasks> GetFakeEmployeeList()
		{
			return new List<Tasks>()
			{
				new Tasks()
				{
					ID = 1,
					Status = "In Progress",
					Type = "Bug",
					Priority = "Critical",
					UserID = Guid.NewGuid(),
					Description = "this is a test description"
				}
			};
		}

		[Test]
		public void AddTask()
		{
			
			var results = tasksService.GetTasksForUser(tasks.First().UserID);

			
			//var result = tasksService.GetTasksForUser(GetFakeEmployeeList().First().UserID);
		}
	}
}