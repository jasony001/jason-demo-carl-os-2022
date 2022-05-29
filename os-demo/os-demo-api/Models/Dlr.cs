using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.Models
{
    public partial class Dlr
    {
        public Dlr()
        {
        }

        public int PartyId { get; set; }
        public long TestDataSetId { get; set; }
        public int LegPartyId { get; set; }
        public string DlrName { get; set; }
        public string DlrClassId { get; set; }
        public string Email { get; set; }
        public string DlrTypeId { get; set; }
        public string DlrOpStatusId { get; set; }
        public string DlrOpStatusReasonId { get; set; }
        public bool? EwhideFlag { get; set; }
        public bool? IsPrivateSale { get; set; }
        public int? RegNumber { get; set; }
        public string RegStatusId { get; set; }
        public string RegExpirydateId { get; set; }
        public bool? Tc { get; set; }

    }
}
