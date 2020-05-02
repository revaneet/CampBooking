using DataAccess;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class UserService
    {
        CampBookingDAL campBookingDAL = new CampBookingDAL();
        public UserDTO GetUser(string email, string password)
        {
            try
            {
                return campBookingDAL.GetUserDB(email, password);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
