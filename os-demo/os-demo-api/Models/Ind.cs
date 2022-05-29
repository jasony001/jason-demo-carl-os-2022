using System;
using System.Collections.Generic;

#nullable disable

namespace os_demo_api.Models
{
    public partial class Ind
    {
        public Ind()
        {
        }

        public int PartyId { get; set; }
        public long TestDataSetId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string StudentId { get; set; }
        public bool? CertRequired { get; set; }
        public string CertDate { get; set; }
        public string CertRequireDate { get; set; }
        public bool? UsesOmsWeb { get; set; }
        public int? RegNumber { get; set; }
        public string RegStatusId { get; set; }
        public string RegExpirydateId { get; set; }
        public bool? Tc { get; set; }

    }
}
