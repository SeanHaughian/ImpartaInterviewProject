
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
		private readonly ITaskService tasksService;

		[SetUp]
		public void Setup()
		{
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
			var data = GetFakeEmployeeList().AsQueryable();

			var mockSet = new Mock<Microsoft.EntityFrameworkCore.DbSet<Tasks>>();


			mockSet.As<IQueryable<Tasks>>().Setup(m => m.Provider).Returns(data.Provider);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.Expression).Returns(data.Expression);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.ElementType).Returns(data.ElementType);
			mockSet.As<IQueryable<Tasks>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

			var mockContext = new Mock<Context>();
			mockContext.Setup(c => c.Tasks).Returns(mockSet.Object);

			var service = new TaskService(mockContext.Object);
			var results = service.GetTasksForUser(data.First().UserID);

			
			//var result = tasksService.GetTasksForUser(GetFakeEmployeeList().First().UserID);
		}
	}
}