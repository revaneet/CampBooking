using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DatabaseModels
{
    public class CampEntity
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string CampName { get; set; }

        [Required]
        public int RatePerNight { get; set; }

        [Required]
        public int MaxCapacity { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string ImageFile { get; set; }

    }
}
