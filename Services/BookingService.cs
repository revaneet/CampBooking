using DataAccess;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class BookingService
    {
        CampBookingDAL campBookingDAL = new CampBookingDAL();
        public void PostNewBooking(BookingDTO bookingDTO)
        {
            try
            {
                campBookingDAL.PostNewBookingDB(bookingDTO);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public BookingDTO GetBookingById(string bookingId)
        {
            try
            {
                return campBookingDAL.GetBookingByIdDB(bookingId);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public void PutBookingById(string bookingId , BookingDTO bookingDTO)
        {
            try
            {
                this.campBookingDAL.PutBookingByIdDB(bookingId, bookingDTO);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
