namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedExtraChargesAppliedfield : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BookingEntity", "ExtraChargesApplied", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BookingEntity", "ExtraChargesApplied");
        }
    }
}
