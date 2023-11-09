using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace ImpartaInterviewProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly Context _context;

		public UserController(IConfiguration configuration, Context context)
		{
			_context = context;
			_configuration = configuration;
		}

		[HttpPost]
		[Route("register")]
		public JsonResult Register(User user)
		{
			try
			{
				_context.Users.Add(user);
				_context.SaveChanges();
				return new JsonResult("Created user successfully. Please login with created credentials");
			}
			catch (Exception e) {
				throw new Exception(e.ToString());
			}
		}

		[HttpPost]
		[Route("login")]
		public JsonResult Login(User user)
		{
			try
			{
				if (!IsValidUser(user))
				{
					return new JsonResult("Invalid user credentials, cannot log in");
				}
				return new JsonResult("true");
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		private bool IsValidUser(User user)
		{
			return _context
				.Users.Where(x => x.Email.Equals(user.Email) && x.Password.Equals(user.Password))
				.Count() == 1;
        }
	}
}
