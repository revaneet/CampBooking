﻿using Services;
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
                    var today = DateTime.Today;
                    filters["checkIn"] = today.ToString();
                    filters["checkOut"] = today.AddDays(1).ToString();
                    filters["capacity"] = "0";
                    allCamps = campService.GetAllFilteredCamps(filters);
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
        [Route("api/Camp/GetSelectedCamp/{campId}")]
        public HttpResponseMessage GetSelectedCamp(int campId)
        {
            CampDTO campDTO = new CampDTO();
            try
            {
                campDTO = this.campService.GetCampById(campId);
            }
            catch(Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound,"Camp with id"+campId+"doesn't exist");
            }
            return Request.CreateResponse(HttpStatusCode.OK, campDTO);
        }

        // POST: api/Camp
        //[HttpPost]
        //public HttpResponseMessage PostNewCamp()
        //{
        //    try
        //    {
        //        string imageName = null;
        //        var httpRequest = HttpContext.Current.Request;

        //        var uploadedImg = httpRequest.Files["Image"];
        //        imageName = Path.GetFileNameWithoutExtension(uploadedImg.FileName.Replace(" ", "-"));
        //        imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(uploadedImg.FileName);
        //        var filePath = HttpContext.Current.Server.MapPath("~/CampImages/" + imageName);
        //        uploadedImg.SaveAs(filePath);

        //        Image image = Image.FromFile(filePath);

        //        MemoryStream m = new MemoryStream();
        //        image.Save(m, image.RawFormat);
        //        byte[] imageBytes = m.ToArray();

        //        // Convert byte[] to Base64 String
        //        string base64String = Convert.ToBase64String(imageBytes);

        //        CampDTO campDTO = new CampDTO
        //        {
        //            CampName = httpRequest["campName"],
        //            MaxCapacity = int.Parse(httpRequest["maxCapacity"]),
        //            Description = httpRequest["desc"],
        //            RatePerNight = int.Parse(httpRequest["ratePerNight"]),
        //            Image = imageName,
        //            ImageFile = base64String
        //        };
        //        campService.PostNewCamp(campDTO);

        //    }
        //    catch(Exception)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError);
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}

        //POST: api/Camp
        [HttpPost]
        [Authorize]
        public HttpResponseMessage PostNewCamp([FromBody]CampDTO campDTO)
        {
            try
            {
                campService.PostNewCamp(campDTO);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // PUT: api/Camp/5
        [HttpPut]
        [Authorize]
        public HttpResponseMessage PutSelectedCamp(int id, [FromBody]CampDTO campDTO)
        {
            try
            {
                campService.PutCampById(id, campDTO);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE: api/Camp/5
        [HttpDelete]
        [Authorize]
        [Route("api/Camp/DeleteSelectedCamp/{campId}")]
        public HttpResponseMessage DeleteSelectedCamp(int campId)
        {
            try
            {
                campService.DeleteCampById(campId);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
