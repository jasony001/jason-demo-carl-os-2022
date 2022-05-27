using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.DBModels
{
    public partial class Ind
    {
        public int PartyId { get; set; }
        public long TestDataSetId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string StudentId { get; set; }
        public bool? CertRequired { get; set; }
        public DateTime? CertDate { get; set; }
        public DateTime? CertRequireDate { get; set; }
        public bool? UsesOmsWeb { get; set; }
        public int? RegNumber { get; set; }
        public string RegStatusId { get; set; }
        public string RegExpiydateId { get; set; }
        public bool? Tc { get; set; }

        public virtual TestDataSet TestDataSet { get; set; }
    }
}
