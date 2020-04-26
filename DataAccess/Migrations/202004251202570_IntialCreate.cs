namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IntialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BookingEntity",
                c => new
                    {
                        ID = c.String(nullable: false, maxLength: 128),
                        CampID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        CheckInDate = c.DateTime(nullable: false),
                        CheckOutDate = c.DateTime(nullable: false),
                        BillingAddress = c.String(nullable: false),
                        State = c.String(nullable: false),
                        Country = c.String(nullable: false),
                        ZipCode = c.String(nullable: false),
                        PhoneNumber = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.CampEntity", t => t.CampID, cascadeDelete: true)
                .ForeignKey("dbo.UserEntity", t => t.UserID, cascadeDelete: true)
                .Index(t => t.CampID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.CampEntity",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CampName = c.String(nullable: false),
                        RatePerNight = c.Int(nullable: false),
                        MaxCapacity = c.Int(nullable: false),
                        Description = c.String(),
                        Image = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.UserEntity",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        FullName = c.String(nullable: false),
                        IsAdmin = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BookingEntity", "UserID", "dbo.UserEntity");
            DropForeignKey("dbo.BookingEntity", "CampID", "dbo.CampEntity");
            DropIndex("dbo.BookingEntity", new[] { "UserID" });
            DropIndex("dbo.BookingEntity", new[] { "CampID" });
            DropTable("dbo.UserEntity");
            DropTable("dbo.CampEntity");
            DropTable("dbo.BookingEntity");
        }
    }
}
