using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CampBooking.Controllers
{
    public class BookingController : ApiController
    {
        // GET: api/Booking
        [HttpGet]
        public IEnumerable<string> GetAllCamps()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Booking/5
        [HttpGet]
        public string GetSelectedCamp(int id)
        {
            return "value";
        }

        // POST: api/Booking
        [HttpPost]
        public void PostNewCamp([FromBody]string value)
        {
        }

        // PUT: api/Booking/5
        [HttpPut]
        public void PutSelectedCamp(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Booking/5
        [HttpDelete]
        public void DeleteSlectedCamp(int id)
        {
        }
    }
}
