using ImpartaInterviewProject.Models;
using ImpartaInterviewProject.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ImpartaInterviewProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly IUserService _userService;

		public UserController(IConfiguration configuration, IUserService userService)
		{
			_configuration = configuration;
			_userService = userService;
		}

		[HttpPost]
		[Route("register")]
		public JsonResult Register(User user)
		{
			return _userService.Register(user);
		}

		[HttpPost]
		[Route("login")]
		public JsonResult Login(User user)
		{
			return _userService.Login(user);
		}

		[Route("SaveProfilePhoto")]
		[HttpPost]
		public JsonResult SaveFile(Guid id)
		{
			return _userService.SaveFile(id, Request);
		}

		[HttpGet]
		public JsonResult GetUser(Guid id)
		{
			return _userService.GetUser(id);
		}
	}
}
