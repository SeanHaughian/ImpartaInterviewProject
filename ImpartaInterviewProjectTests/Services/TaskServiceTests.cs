
using ImpartaInterviewProject.Models;
using ImpartaInterviewProject.Services;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ImpartaInterviewProjectTests.Services
{
    public class Tests
    {
        private TaskService tasksService;
        private IQueryable<Tasks> tasks;

        [SetUp]
        public void Setup()
        {
            tasks = GetFakeEmployeeList().AsQueryable();

            var mockSet = new Mock<Microsoft.EntityFrameworkCore.DbSet<Tasks>>();


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
        public void GetTasksForUser_UserIDProvided_ReturnsTasks()
        {
            var results = tasksService.GetTasksForUser(tasks.First().UserID).Value;

            Assert.IsNotNull(results);
        }

        [Test]
        public void CreateTask_TaskProvided_ReturnsTasks()
        {
            var task = new Tasks()
            {
                ID = 2,
                Status = "Completed",
                Type = "Bug",
                Priority = "Critical",
                UserID = Guid.NewGuid(),
                Description = "this is a test description"
            };

            var result = tasksService.CreateTask(task).Value;

            Assert.AreEqual("Added task successfully", result);
        }

        [Test]
        public void UpdateTask_TaskProvided_ReturnsTasks()
        {
            tasks.First().Description = "updated description";
            var result = tasksService.UpdateTask(tasks.First()).Value;
            Assert.AreEqual("Updated task updated description successfully", result);
        }

        [Test]
        public void DeleteTask_UserIDProvided_ReturnsTasks()
        {
            var result = tasksService.DeleteTask(tasks.First().ID).Value;
            Assert.AreEqual("Deleted task this is a test description successfully", result);
        }
    }
}