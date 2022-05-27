using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class Dlr
    {
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
        public string RegExpiydateId { get; set; }
        public bool? Tc { get; set; }

        public virtual LuDlrClass DlrClass { get; set; }
        public virtual LuDlrOpStatu DlrOpStatus { get; set; }
        public virtual LuDlrOpStatusReason DlrOpStatusReason { get; set; }
        public virtual LuDlrType DlrType { get; set; }
        public virtual TestDataSet TestDataSet { get; set; }
    }
}
