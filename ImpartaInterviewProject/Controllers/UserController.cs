using ImpartaInterviewProject.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;
using System.IO;
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
		private IWebHostEnvironment _webHostEnvironment;
		private readonly Context _context;

		public UserController(IConfiguration configuration, Context context, IWebHostEnvironment webHostEnvironment)
		{
			_context = context;
			_configuration = configuration;
			_webHostEnvironment = webHostEnvironment;
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
					return new JsonResult(-1);
				}
				return new JsonResult(user.ID);
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		[Route("SaveProfilePhoto")]
		[HttpPost]
		public JsonResult SaveFile()
		{
			try
			{
				var httpRequest = Request.Form;
				var postedFile = httpRequest.Files[0];
				string fileName = postedFile.FileName;
				var physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + fileName;

				using(var stream = new FileStream(physicalPath, FileMode.Create))
				{
					postedFile.CopyTo(stream);
				}

				return new JsonResult(fileName);
			}
			catch (Exception) {
				return new JsonResult("anonymous.png");
			}
		}

		[HttpGet]
		public JsonResult GetUser(Guid id)
		{
			var user = _context.Users.Where(x => x.ID == id).FirstOrDefault();
			return new JsonResult(user);
		}

		private bool IsValidUser(User user)
		{
			return _context
				.Users.Where(x => x.Email.Equals(user.Email) && x.Password.Equals(user.Password))
				.Count() == 1;
        }
	}
}
