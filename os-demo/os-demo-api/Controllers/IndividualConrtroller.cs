using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using os_demo_api.DBModels;
using os_demo_api.Models;

namespace os_demo_api.Controllers
{
    [ApiController]

    public class IndividualConrtroller : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<IndividualConrtroller> _logger;

        public IndividualConrtroller(ILogger<IndividualConrtroller> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }



        [HttpGet]
        [Route("/api/Individuals/{id}")]
        public ActionResult<Models.Ind> Get(int id)
        {

            DBModels.Ind ind = _db.Inds.FirstOrDefault(s => s.PartyId == id);
            if (ind == null) return NotFound();

            return Ok(new Models.Ind
            {
                PartyId = ind.PartyId,
                TestDataSetId = ind.TestDataSetId,
                FirstName = ind.FirstName,
                LastName = ind.LastName,
                BirthDate = ind.BirthDate.HasValue ? ind.BirthDate.Value.ToString("yyyy-MM-dd") : "",
                Email = ind.Email,
                Gender = ind.Gender,
                StudentId = ind.StudentId,
                CertRequired = ind.CertRequired,
                CertDate = ind.CertDate.HasValue ? ind.CertDate.Value.ToString("yyyy-MM-dd") : "",
                CertRequireDate = ind.CertRequireDate.HasValue ? ind.CertRequireDate.Value.ToString("yyyy-MM-dd") : "",
                RegNumber = ind.RegNumber,
                RegStatusId = ind.RegStatusId,
                RegExpirydateId = ind.RegExpirydateId,
                Tc = ind.Tc,
            });
        }


        [HttpPut]
        [Route("/api/Individuals")]
        public ActionResult<Models.Ind> SavePartyRltn(Models.Ind ind)
        {
            DBModels.Ind dbInd = _db.Inds.FirstOrDefault(i => i.PartyId == ind.PartyId);
            if (dbInd == null)
            {
                return NotFound();
            }


            dbInd.PartyId = ind.PartyId;
            dbInd.TestDataSetId = ind.TestDataSetId;
            dbInd.FirstName = ind.FirstName;
            dbInd.LastName = ind.LastName;
            dbInd.BirthDate = string.IsNullOrEmpty(ind.BirthDate) ? null : DateTime.Parse(ind.BirthDate);
            dbInd.Email = ind.Email;
            dbInd.Gender = ind.Gender;
            dbInd.StudentId = ind.StudentId;
            dbInd.CertRequired = ind.CertRequired;
            dbInd.CertDate = string.IsNullOrEmpty(ind.CertDate) ? null : DateTime.Parse(ind.CertDate);
            dbInd.CertRequireDate = string.IsNullOrEmpty(ind.CertRequireDate) ? null : DateTime.Parse(ind.CertRequireDate);
            dbInd.RegNumber = ind.RegNumber;
            dbInd.RegStatusId = ind.RegStatusId;
            dbInd.RegExpirydateId = ind.RegExpirydateId;



            dbInd.Tc = ind.Tc;

            _db.SaveChanges();

            return Ok(ind);
        }
    }
}
