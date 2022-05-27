using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class PartyRltn
    {
        public int PartyRltnId { get; set; }
        public long TestDataSetId { get; set; }
        public bool? IsPrimary { get; set; }
        public bool? IsApproved { get; set; }
        public int? IndPartyId { get; set; }
        public int? DlrPartyId { get; set; }
        public int? LegPartyId { get; set; }
        public string PartyRltnRoleId { get; set; }
        public string PartyRltnBranchId { get; set; }
        public bool? IsReviewed { get; set; }
        public bool? IsPersonInCharge { get; set; }

        public virtual LuPartyRltnBranch PartyRltnBranch { get; set; }
        public virtual LuPartyRltnRole PartyRltnRole { get; set; }
    }
}
