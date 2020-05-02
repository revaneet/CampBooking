using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shared;
using Services;
using System.Web;

namespace CampBooking.Controllers
{
    public class BookingController : ApiController
    {
        BookingService bookingService = new BookingService();
        CampService campService = new CampService();

        // GET: api/Booking
        [HttpGet]
        public IEnumerable<string> GetAllBookings()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Booking/5
        [HttpGet]
        [Route("api/Booking/{bookingId}")]
        public HttpResponseMessage GetSelectedBooking(string bookingId)
        {
            BookingDTO bookingDTO = new BookingDTO();
            //var httpRequest = HttpContext.Current.Request;
            //var bookingId = httpRequest["booingId"];
            try
            {
                bookingDTO = bookingService.GetBookingById(bookingId);
                bookingDTO.Camp = campService.GetCampById(bookingDTO.CampID);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK, bookingDTO);
        }

        // POST: api/Booking
        [HttpPost]
        public HttpResponseMessage PostNewBooking([FromBody]BookingDTO bookingDTO)
        {
            try
            {
                string bookID = new GenerateUniqueKey().GetUniqueKey();
                bookingDTO.ID = bookID;
                bookingService.PostNewBooking(bookingDTO);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
            return Request.CreateResponse(HttpStatusCode.OK, bookingDTO.ID);
            
        }

        // PUT: api/Booking/5
        [HttpPut]
        public void PutSelectedBooking(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Booking/5
        [HttpDelete]
        public void DeleteSlectedBooking(int id)
        {
        }
    }
}
