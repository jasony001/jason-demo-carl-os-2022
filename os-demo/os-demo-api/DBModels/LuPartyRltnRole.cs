using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuPartyRltnRole
    {
        public LuPartyRltnRole()
        {
            PartyRltns = new HashSet<PartyRltn>();
        }

        public string PartyRltnRoleId { get; set; }
        public string Description { get; set; }
        public bool? SalesRole { get; set; }
        public string PartyRltnRoleCatId { get; set; }

        public virtual ICollection<PartyRltn> PartyRltns { get; set; }
    }
}
