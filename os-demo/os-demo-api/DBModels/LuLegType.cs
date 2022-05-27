using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuLegType
    {
        public LuLegType()
        {
            Legs = new HashSet<Leg>();
        }

        public string LegTypeId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Leg> Legs { get; set; }
    }
}
