using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOModels
{
    public class CampDTO
    {
        public int ID { get; set; }

        [Required]
        public string CampName { get; set; }

        [Required]
        public int RatePerNight { get; set; }

        [Required]
        public int MaxCapacity { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }
    }
}
