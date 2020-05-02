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
        public List<CampDTO> GetAllFilteredCamps(Dictionary<string,string> filters)
        {
            try
            {
                return campBookingDAL.GetAllFilteredCampsDB( filters);
            }
            catch (Exception e)
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
        public CampDTO GetCampById(int id)
        {
            try
            {
                return campBookingDAL.GetCampByIdDB(id);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
