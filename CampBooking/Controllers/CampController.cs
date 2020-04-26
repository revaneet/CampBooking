using Services;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CampBooking.Controllers
{
    public class CampController : ApiController
    {
        CampService campService = new CampService();

        // GET: api/Camp
        [HttpGet]
        public HttpResponseMessage GetAllCamps()
        {
            List<CampDTO> allCamps = new List<CampDTO>();
            try
            {
                allCamps = campService.GetAllCamps();
                if (allCamps.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, allCamps);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent, allCamps);
                }
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            
        }

        // GET: api/Camp/5
        [HttpGet]
        public string GetSelectedCamp(int id)
        {
            return "value";
        }

        // POST: api/Camp
        [HttpPost]
        public HttpResponseMessage PostNewCamp([FromBody]CampDTO campDTO)
        {
            try
            {
                campService.PostNewCamp(campDTO);

            }
            catch(Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            return Request.CreateResponse(HttpStatusCode.OK,campDTO);
        }

        // PUT: api/Camp/5
        [HttpPut]
        public void PutSelectedCamp(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Camp/5
        [HttpPost]
        public void DeleteSelectedCamp(int id)
        {
        }
    }
}
