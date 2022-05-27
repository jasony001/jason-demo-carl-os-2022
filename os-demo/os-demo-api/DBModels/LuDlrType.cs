using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class LuDlrType
    {
        public LuDlrType()
        {
            Dlrs = new HashSet<Dlr>();
        }

        public string DlrTypeId { get; set; }
        public string Description { get; set; }
        public string DlrClassIds { get; set; }

        public virtual ICollection<Dlr> Dlrs { get; set; }
    }
}
