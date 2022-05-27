using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuPartyRltnBranch
    {
        public LuPartyRltnBranch()
        {
            PartyRltns = new HashSet<PartyRltn>();
        }

        public string PartyRltnBranchId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<PartyRltn> PartyRltns { get; set; }
    }
}
