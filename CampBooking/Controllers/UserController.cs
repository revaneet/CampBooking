using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace CampBooking.Controllers
{
    public class UserController : ApiController
    {
        // GET: api/User
        [HttpGet]
        [Route("api/GetUserClaims")]
        [Authorize]
        public UserDTO Get()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            UserDTO userDTO = new UserDTO()
            {
                FullName = identityClaims.FindFirst("FullName").Value,
                Email = identityClaims.FindFirst("Email").Value,
                IsAdmin = identityClaims.FindFirst("UserType").Value == "Admin",
                ID = Int32.Parse(identityClaims.FindFirst("ID").Value)

            };
            return userDTO;
        }

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
