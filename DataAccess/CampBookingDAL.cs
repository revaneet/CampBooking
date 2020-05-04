using AutoMapper;
using DataAccess.DatabaseModels;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class CampBookingDAL
    {
        CampBookingContext db = new CampBookingContext();
        MapperConfiguration config;
        IMapper iMapper;

        //Constructor
        public CampBookingDAL()
        {
            config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CampEntity, CampDTO>();
                cfg.CreateMap<CampDTO, CampEntity>();

                cfg.CreateMap<UserEntity, UserDTO>();
                cfg.CreateMap<UserDTO, UserEntity>();

                cfg.CreateMap<BookingDTO, BookingEntity>();
                cfg.CreateMap<BookingEntity, BookingDTO>();
            });

            iMapper = config.CreateMapper();
        }

        // Get all Camps
        public List<CampDTO> GetAllCampsDB()
        {
            IQueryable<CampEntity> allCampsEntity;
            List<CampDTO> allCampsDTO = new List<CampDTO>();
            try
            {
                allCampsEntity = from c in db.Camps
                                 select c;
                allCampsEntity.ToList().ForEach(c => allCampsDTO.Add( iMapper.Map<CampEntity, CampDTO> (c) ));
                return allCampsDTO;
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        // Get all Camps
        public List<CampDTO> GetAllFilteredCampsDB(Dictionary<string,string> filters)
        {
            IQueryable<CampEntity> allCampsEntity;
            IQueryable<CampEntity> allCampsEntity2;
            List<CampDTO> allCampsDTO = new List<CampDTO>();
            try
            {
                var capacity = Int32.Parse(filters["capacity"]);
                var checkIn = DateTime.Parse(filters["checkIn"]);
                var checkOut = DateTime.Parse(filters["checkOut"]);
                //allCampsEntity = from c in db.Camps
                //                 where (from b in db.Bookings
                //                        where DateTime.Parse(filters["checkIn"]) >= b.CheckOutDate
                //                              && DateTime.Parse(filters["checkOut"]) <= b.CheckInDate
                //                        select b.CampID).Contains(c.ID) && c.MaxCapacity >= Int32.Parse(filters["capacity"])
                //                 select c;

                allCampsEntity = (from c in db.Camps
                                  from b in db.Bookings
                                  where c.MaxCapacity >= capacity
                                        &&  ((c.ID == b.CampID) &&
                                            (checkIn >= b.CheckOutDate
                                            || checkOut <= b.CheckInDate))

                                  select c);

                allCampsEntity2 = (
                                    from c in db.Camps
                                    where c.MaxCapacity >= capacity
                                    select c
                                    ).Except
                                    (
                                        (from c in db.Camps
                                         from b in db.Bookings
                                         where c.ID == b.CampID
                                         select c).Distinct()

                                    ).Distinct();

                allCampsEntity.ToList().ForEach(c => allCampsDTO.Add(iMapper.Map<CampEntity, CampDTO>(c)));
                allCampsEntity2.ToList().ForEach(c => allCampsDTO.Add(iMapper.Map<CampEntity, CampDTO>(c)));
                return allCampsDTO;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // Post new Camp
        public void PostNewCampDB(CampDTO campDTO)
        {
            try
            {
                CampEntity campEntity = iMapper.Map<CampDTO, CampEntity>(campDTO);
                db.Camps.Add(campEntity);
                db.SaveChanges();

            }
            catch(Exception e)
            {
                throw e;
            }
        }

        // Get User
        public UserDTO GetUserDB(string email,string password)
        { 
            try
            {
               var userEntity = (from u in db.Users
                                 where u.Email == email && u.Password == password
                                 select u ).SingleOrDefault();

                return iMapper.Map<UserEntity, UserDTO>(userEntity);

            }
            catch(Exception e)
            {
                throw e;
            }            
        }

        //Get Camp by Id
        public CampDTO GetCampByIdDB(int id)
        {
            try
            {
                var campEntity = (from c in db.Camps
                                 where c.ID == id
                                 select c).Single();

                return iMapper.Map<CampEntity, CampDTO>(campEntity);
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        // Post new Booking
        public void PostNewBookingDB(BookingDTO bookingDTO)
        {
            try
            {
                BookingEntity bookingEntity = new BookingEntity();
                bookingEntity = iMapper.Map<BookingDTO, BookingEntity>(bookingDTO);
                db.Bookings.Add(bookingEntity);
                db.SaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        // Get booking by id
        public BookingDTO GetBookingByIdDB(string bookingId)
        {
            try
            {
                BookingEntity bookingEntity = (from b in db.Bookings
                                               where b.ID == bookingId
                                               select b).Single();

                return iMapper.Map<BookingEntity, BookingDTO>(bookingEntity);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public void PutBookingByIdDB(string bookingId,BookingDTO bookingDTO)
        {
            try
            {
                BookingEntity bookingEntity = db.Bookings.Find(bookingId);
                bookingEntity.BillingAddress = bookingDTO.BillingAddress;
                bookingEntity.Country = bookingDTO.Country;
                bookingEntity.PhoneNumber = bookingDTO.PhoneNumber;
                bookingEntity.Ratings = bookingDTO.Ratings;
                bookingEntity.State = bookingDTO.State;
                bookingEntity.ZipCode = bookingDTO.ZipCode;
                db.SaveChanges();

                UpdateRatings(bookingDTO.CampID);


            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public void UpdateRatings(int campId)
        {
            var avgRating = (from b in db.Bookings
                             where b.CampID == campId
                             select b.Ratings).Average();
            CampEntity campEntity = db.Camps.Find(campId);

            campEntity.Ratings = (int)Math.Ceiling(avgRating);
            db.SaveChanges();
        }

    }
}
