namespace DataAccess.Migrations
{
    using DataAccess.DatabaseModels;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataAccess.CampBookingContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DataAccess.CampBookingContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            //var users = new List<UserEntity>
            //{
            //    new UserEntity{ Email="admin@campbooking.com" , FullName ="Admin" , Password = "admin123" , IsAdmin=true},
            //    new UserEntity{Email="ravneetkaur91997@gmail.com",FullName = "Ravneet Kaur" , Password="abc123"}
            //};
            //users.ForEach(u => context.Users.AddOrUpdate(p => p.ID, u));
            //context.SaveChanges();

            //var camps = new List<CampEntity>
            //{
            //    new CampEntity {CampName="View Camp" , RatePerNight = 1000 , MaxCapacity = 10},
            //    new CampEntity {CampName="Paradise Camp" , RatePerNight = 1200 , MaxCapacity = 10}
            //};
            //camps.ForEach(u => context.Camps.AddOrUpdate(p => p.ID, u));
            //context.SaveChanges();

            //var bookings = new List<BookingEntity>
            //{
            //    new BookingEntity
            //    {
            //        ID ="Dq1Avn4d",
            //        CampID =1,               
            //        BillingAddress ="191 , preet vihar",
            //        State ="Amritsar",
            //        Country ="India",
            //        ZipCode ="143104",
            //        CheckInDate =DateTime.Parse("11-03-2020 00:00:00"),
            //        CheckOutDate =DateTime.Parse("14-03-2020 00:00:00"),
            //        PhoneNumber = "8764738493"
            //    }
            //};
            //bookings.ForEach(u => context.Bookings.AddOrUpdate(p => p.ID, u));
            //context.SaveChanges();
        }
    }
}
