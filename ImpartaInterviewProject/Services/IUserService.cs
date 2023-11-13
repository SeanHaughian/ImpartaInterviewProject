using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ImpartaInterviewProject.Services
{
	public interface IUserService
	{
		public JsonResult Register(User user);
		public JsonResult Login(User user);
		public JsonResult SaveFile(Guid id, HttpRequest Request);
		public JsonResult GetUser(Guid id);
	}
}
