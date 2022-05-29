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

    public class PartyRltnController : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<PartyRltnController> _logger;

        public PartyRltnController(ILogger<PartyRltnController> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }


        [HttpDelete]
        [Route("/api/PartyRltns/{id}")]
        public ActionResult DeletePartyRltn(long id)
        {
           var pr = _db.PartyRltns.FirstOrDefault(s => s.PartyRltnId == id);
            if (pr == null) return NotFound();

            _db.PartyRltns.Remove(pr);
            _db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("/api/PartyRltns/{id}")]
        public ActionResult<Models.PartyRltn> Get(int id)
        {

            DBModels.PartyRltn pr = _db.PartyRltns.FirstOrDefault(s => s.PartyRltnId == id);
            if (pr == null) return NotFound();
            string catId = _db.LuPartyRltnRoles.FirstOrDefault(lr => lr.PartyRltnRoleId == pr.PartyRltnRoleId).PartyRltnRoleCatId;

            return Ok(new Models.PartyRltn
            {
                PartyRltnId = pr.PartyRltnId,
                TestDataSetId = pr.TestDataSetId,
                IsPrimary = pr.IsPrimary,
                IsApproved = pr.IsApproved,
                IndPartyId = pr.IndPartyId,
                DlrPartyId = pr.DlrPartyId,
                LegPartyId = pr.LegPartyId,
                PartyRltnRoleId = pr.PartyRltnRoleId,
                PartyRltnRoleCatId = catId,
                PartyRltnBranchId = pr.PartyRltnBranchId,
                IsReviewed = pr.IsReviewed,
                IsPersonInCharge = pr.IsPersonInCharge,
            });
        }

        [HttpPost]
        [Route("/api/PartyRltns")]
        public ActionResult<Models.PartyRltn> AddPartyRltn(Models.PartyRltn pr)
        {
            string catId = _db.LuPartyRltnRoles.FirstOrDefault(lpr => lpr.PartyRltnRoleId == pr.PartyRltnRoleId).PartyRltnRoleCatId;

            DBModels.PartyRltn newPartyRltn = new DBModels.PartyRltn
            {
                TestDataSetId = pr.TestDataSetId,
                IsPrimary = pr.IsPrimary,
                IsApproved = pr.IsApproved,
                IndPartyId = pr.IndPartyId,
                DlrPartyId = pr.DlrPartyId,
                LegPartyId = pr.LegPartyId,
                PartyRltnRoleId = pr.PartyRltnRoleId,
                PartyRltnBranchId = pr.PartyRltnBranchId,
                IsReviewed = pr.IsReviewed,
                IsPersonInCharge = pr.IsPersonInCharge
            };
            _db.PartyRltns.Add(newPartyRltn);
            _db.SaveChanges();

            pr.PartyRltnId = newPartyRltn.PartyRltnId;

            return Ok(pr);
        }

        [HttpPut]
        [Route("/api/PartyRltns")]
        public ActionResult<Models.PartyRltn> SavePartyRltn(Models.PartyRltn pr)
        {
            DBModels.PartyRltn dbPr = _db.PartyRltns.FirstOrDefault(r => r.PartyRltnId == pr.PartyRltnId);
            if (dbPr == null)
            {
                return NotFound();
            }

            dbPr.TestDataSetId = pr.TestDataSetId;
            dbPr.IsPrimary = pr.IsPrimary;
            dbPr.IsApproved = pr.IsApproved;
            dbPr.IndPartyId = pr.IndPartyId;
            dbPr.DlrPartyId = pr.DlrPartyId;
            dbPr.LegPartyId = pr.LegPartyId;
            dbPr.PartyRltnRoleId = pr.PartyRltnRoleId;
            dbPr.PartyRltnBranchId = pr.PartyRltnBranchId;
            dbPr.IsReviewed = pr.IsReviewed;
            dbPr.IsPersonInCharge = pr.IsPersonInCharge;

            _db.SaveChanges();

            return Ok(pr);
        }
    }
}
