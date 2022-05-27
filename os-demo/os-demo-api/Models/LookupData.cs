using System.Collections.Generic;
using os_demo_api.DBModels;

namespace os_demo_api.Models
{
    public class LookupData 
    {
        public IEnumerable<LuDlrClass> dlrClassLookup {get;set;}
        
        public IEnumerable<LuDlrType> dlrTypeLookup {get;set;}
        
        public IEnumerable<LuDlrOpStatu> dlrOpStatusLookup {get;set;}
        
        public IEnumerable<LuDlrOpStatusReason> dlrOpStatusReasonLookup {get;set;}
        
        public IEnumerable<LuLegType> legTypeLookup {get;set;}
        
        public IEnumerable<LuPartyRltnBranch> partyRltnBranchLookup {get;set;}
        
        public IEnumerable<LuPartyRltnRole> partyRltnRoleLookup {get;set;}
        
        public IEnumerable<LuPartyRltnRoleCat> partyRltnRoleCatLookup {get;set;}
        
        public IEnumerable<LuRegExpiydate> regExpiydateLookup {get;set;}
        
        public IEnumerable<LuRegStatu> regStatusLookup {get;set;}
        
    }
}
