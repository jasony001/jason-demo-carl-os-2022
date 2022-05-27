using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class TestDataSet
    {
        public TestDataSet()
        {
            Dlrs = new HashSet<Dlr>();
            Inds = new HashSet<Ind>();
            Legs = new HashSet<Leg>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Tester { get; set; }

        public virtual ICollection<Dlr> Dlrs { get; set; }
        public virtual ICollection<Ind> Inds { get; set; }
        public virtual ICollection<Leg> Legs { get; set; }
    }
}
