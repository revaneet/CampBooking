namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedExtraWeekendCharges : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CampEntity", "ExtraWeekendCharges", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CampEntity", "ExtraWeekendCharges");
        }
    }
}
