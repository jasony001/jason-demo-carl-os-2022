using System.Collections.Generic;
using os_demo_api.DBModels;

namespace os_demo_api.Models
{
    public class TestDataSet 
    {

        public TestDataSetInfo info {get; set;}
        public IEnumerable<Ind> individuals {get;set;}

        public IEnumerable<Dlr> dealerships {get;set;}
        
        public IEnumerable<Leg> legalEntities {get;set;}

        public IEnumerable<PartyRltn> partyRltns {get;set;}
    }

    public class TestDataSetInfo 
    {
        public long Id {get;set;}

        public string Name { get; set; }

        public string Tester { get; set; }
    }
}