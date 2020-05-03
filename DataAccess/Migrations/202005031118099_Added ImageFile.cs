namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedImageFile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CampEntity", "ImageFile", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CampEntity", "ImageFile");
        }
    }
}
