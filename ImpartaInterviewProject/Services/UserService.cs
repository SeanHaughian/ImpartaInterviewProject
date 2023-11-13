using ImpartaInterviewProject.Models;
using ImpartaInterviewProject.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ImpartaInterviewProject.Services
{
	public class UserService : IUserService
	{
		private IWebHostEnvironment _webHostEnvironment;
		private readonly Context _context;

		public UserService(Context context, IWebHostEnvironment webHostEnvironment)
		{
			_context = context;
			_webHostEnvironment = webHostEnvironment;
		}

		public JsonResult Register(User user)
		{
			try
			{
				user = HashUser(user);
				_context.Users.Add(user);
				_context.SaveChanges();
				return new JsonResult("Created user successfully. Please login with created credentials");
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		public JsonResult Login(User user)
		{
			try
			{
				user = HashUser(user);
				user = GetUser(user);

				if (user == null)
				{
					return new JsonResult("-1");
				}

				return new JsonResult(user);
			}
			catch (Exception e)
			{
				throw new Exception(e.ToString());
			}
		}

		public JsonResult SaveFile(Guid id, HttpRequest Request)
		{
			try
			{
				var httpRequest = Request.Form;
				var postedFile = httpRequest.Files[0];
				string fileName = postedFile.FileName;
				var physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + fileName;

				using (var stream = new FileStream(physicalPath, FileMode.Create))
				{
					postedFile.CopyTo(stream);
				}

				var user = GetUserById(id);
				user.PhotoFileName = fileName;
				_context.Users.Update(user);
				_context.SaveChanges();

				return new JsonResult(fileName);


			}
			catch (Exception)
			{
				return new JsonResult("anonymous.png");
			}
		}

		public JsonResult GetUser(Guid id)
		{
			return new JsonResult(GetUserById(id));
		}

		private User GetUser(User user)
		{
			return _context
				.Users.Where(x => x.Email.Equals(user.Email) && x.Password.Equals(user.Password))
				.FirstOrDefault();
		}

		private User GetUserById(Guid id)
		{
			return _context.Users.Where(x => x.ID == id).FirstOrDefault();
		}

		private User HashUser(User user)
		{
			var emailHash = this.HashString(user.Email);
			var passwordHash = this.HashString(user.Password);
			user.Email = emailHash;
			user.Password = passwordHash;
			return user;
		}

		private string HashString(string text)
		{
			string hashStr;

			using (var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(text)))
			{
				var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(text));
				hashStr = Convert.ToBase64String(hash);
			}
			return hashStr;
		}
	}
}
