using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthGist.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AuthGist.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly UserClaimsAccessor _userClaimsAccessor;
        private readonly GraphService _graphService;

        public WeatherForecastController(UserClaimsAccessor userClaimsAccessor,
            ILogger<WeatherForecastController> logger, GraphService graphService)
        {
            _logger = logger;
            _userClaimsAccessor = userClaimsAccessor;
            _graphService = graphService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("allclaims")]
        public IEnumerable<string> GetAllClaims()
        {
            return _userClaimsAccessor.ClaimNames;
        }

        [HttpGet("users")]
        public async Task<IEnumerable<object>> GetAllUsers()
        {
            return await _graphService.ListUsers();
        }

        [HttpGet("name-by-auth")]
        public string GetName()
        {
            var result = _userClaimsAccessor.Name;
            return result;
        }


    }
}
