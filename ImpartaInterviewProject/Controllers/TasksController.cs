using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace ImpartaInterviewProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TasksController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly Context _context;

		public TasksController(IConfiguration configuration, Context context)
		{
			_context = context;
			_configuration = configuration;
		}

		[HttpGet]
		public JsonResult Get()
		{
			var tasks = from s
						in _context.Tasks
					    select s;

			return new JsonResult(tasks.ToList());
		}
	}
}
