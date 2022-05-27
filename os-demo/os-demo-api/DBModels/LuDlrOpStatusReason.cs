using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuDlrOpStatusReason
    {
        public LuDlrOpStatusReason()
        {
            Dlrs = new HashSet<Dlr>();
        }

        public string DlrOpStatusReasonId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Dlr> Dlrs { get; set; }
    }
}
