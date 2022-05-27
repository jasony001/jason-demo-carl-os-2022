using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.Models
{
    public partial class Leg
    {
        public Leg()
        {
        }

        public long TestDataSetId { get; set; }
        public int PartyId { get; set; }
        public string LegName { get; set; }
        public string LegTypeId { get; set; }

    }
}
