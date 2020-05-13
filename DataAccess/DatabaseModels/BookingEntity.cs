using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DatabaseModels
{
    public class BookingEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ID { get; set; }

        [Required]
        [ForeignKey("CampEntity")]
        public int CampID { get; set; }

        //[Required]
        //[ForeignKey("UserEntity")]
        //public int UserID { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CheckInDate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CheckOutDate { get; set; }

        [Required]
        public string BillingAddress { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string ZipCode { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public int Ratings { get; set; } = 0;

        public bool ExtraChargesApplied { get; set; } = false;

        public virtual CampEntity CampEntity { get; set; }

        //public virtual UserEntity UserEntity { get; set; }
    }
}
