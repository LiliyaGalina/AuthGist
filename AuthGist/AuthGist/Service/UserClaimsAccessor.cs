using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace AuthGist.Service
{
    public class UserClaimsAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserClaimsAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IEnumerable<string> ClaimNames
        {
            get
            {
                return _httpContextAccessor.HttpContext.User.Claims
                    .Select(c => c.Type).ToList();
            }
        }

        public string Name
        {
            get
            {
                return _httpContextAccessor.HttpContext.User.Claims
                    .FirstOrDefault(c => c.Type == "name")?.Value;
            }
        }

        public string Id
        {
            get
            {
                return _httpContextAccessor.HttpContext.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            }
        }

    }
}
