using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class Leg
    {
        public long TestDataSetId { get; set; }
        public int PartyId { get; set; }
        public string LegName { get; set; }
        public string LegTypeId { get; set; }

        public virtual LuLegType LegType { get; set; }
        public virtual TestDataSet TestDataSet { get; set; }
    }
}
