using Services;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
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
                var filters = Request.GetQueryNameValuePairs().ToDictionary(x => x.Key , x=>x.Value);
                if(filters.Count()>0)
                {
                    allCamps = campService.GetAllFilteredCamps(filters);
                }
                else
                {
                    allCamps = campService.GetAllCamps();
                }                
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
        public HttpResponseMessage GetSelectedCamp(int id)
        {
            CampDTO campDTO = new CampDTO();
            try
            {
                campDTO = this.campService.GetCampById(id);
            }
            catch(Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,"Camp with id"+id+"doesn't exist");
            }
            return Request.CreateResponse(HttpStatusCode.OK, campDTO);
        }

        // POST: api/Camp
        [HttpPost]
        public HttpResponseMessage PostNewCamp()
        {
            try
            {
                string imageName = null;
                var httpRequest = HttpContext.Current.Request;

                var uploadedImg = httpRequest.Files["Image"];
                imageName = Path.GetFileNameWithoutExtension(uploadedImg.FileName.Replace(" ", "-"));
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(uploadedImg.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/CampImages/" + imageName);
                uploadedImg.SaveAs(filePath);

                CampDTO campDTO = new CampDTO
                {
                    CampName = httpRequest["campName"],
                    MaxCapacity = int.Parse(httpRequest["maxCapacity"]),
                    Description = httpRequest["desc"],
                    RatePerNight = int.Parse(httpRequest["ratePerNight"]),
                    Image = imageName
                };
                campService.PostNewCamp(campDTO);

            }
            catch(Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
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
