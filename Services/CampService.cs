using DataAccess;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class CampService
    {
        CampBookingDAL campBookingDAL = new CampBookingDAL();
        public List<CampDTO> GetAllCamps()
        {
            try
            {
                return campBookingDAL.GetAllCampsDB();
            }
            catch(Exception e)
            {
                throw e;
            }

        }
        public void PostNewCamp(CampDTO campDTO)
        {
            try
            {
                campBookingDAL.PostNewCampDB(campDTO);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
