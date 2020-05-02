namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedUserForeignKey : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BookingEntity", "UserID", "dbo.UserEntity");
            DropIndex("dbo.BookingEntity", new[] { "UserID" });
            DropColumn("dbo.BookingEntity", "UserID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BookingEntity", "UserID", c => c.Int(nullable: false));
            CreateIndex("dbo.BookingEntity", "UserID");
            AddForeignKey("dbo.BookingEntity", "UserID", "dbo.UserEntity", "ID", cascadeDelete: true);
        }
    }
}
