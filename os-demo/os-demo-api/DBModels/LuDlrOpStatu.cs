using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuDlrOpStatu
    {
        public LuDlrOpStatu()
        {
            Dlrs = new HashSet<Dlr>();
        }

        public string DlrOpStatusId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Dlr> Dlrs { get; set; }
    }
}
