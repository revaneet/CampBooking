namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedRatings : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BookingEntity", "Ratings", c => c.Int(nullable: false));
            AddColumn("dbo.CampEntity", "Ratings", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CampEntity", "Ratings");
            DropColumn("dbo.BookingEntity", "Ratings");
        }
    }
}
