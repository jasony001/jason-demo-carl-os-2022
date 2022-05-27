using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuDlrClass
    {
        public LuDlrClass()
        {
            Dlrs = new HashSet<Dlr>();
        }

        public string DlrClassId { get; set; }
        public string Description { get; set; }
        public bool PayTransactionFees { get; set; }

        public virtual ICollection<Dlr> Dlrs { get; set; }
    }
}
