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

    public class DealershipController : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<DealershipController> _logger;

        public DealershipController(ILogger<DealershipController> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }



        [HttpGet]
        [Route("/api/Dealerships/{id}")]
        public ActionResult<Models.Dlr> Get(int id)
        {

            DBModels.Dlr dlr = _db.Dlrs.FirstOrDefault(s => s.PartyId == id);
            if (dlr == null) return NotFound();

            return Ok(new Models.Dlr
            {
                PartyId = dlr.PartyId,
                TestDataSetId = dlr.TestDataSetId,
                LegPartyId = dlr.LegPartyId,
                DlrName = dlr.DlrName,
                DlrClassId = dlr.DlrClassId,
                Email = dlr.Email,
                DlrTypeId = dlr.DlrTypeId,
                DlrOpStatusId = dlr.DlrOpStatusId,
                DlrOpStatusReasonId = dlr.DlrOpStatusReasonId,
                EwhideFlag = dlr.EwhideFlag,
                IsPrivateSale = dlr.IsPrivateSale,
                RegNumber = dlr.RegNumber,
                RegStatusId = dlr.RegStatusId,
                RegExpirydateId = dlr.RegExpirydateId,
                Tc = dlr.Tc,
            });
        }


        [HttpPut]
        [Route("/api/Dealerships")]
        public ActionResult<Models.Dlr> SavePartyRltn(Models.Dlr dlr)
        {
            DBModels.Dlr dbDlr = _db.Dlrs.FirstOrDefault(r => r.PartyId == dlr.PartyId);
            if (dbDlr == null)
            {
                return NotFound();
            }


            dbDlr.PartyId = dlr.PartyId;
            dbDlr.TestDataSetId = dlr.TestDataSetId;
            dbDlr.LegPartyId = dlr.LegPartyId;
            dbDlr.DlrName = dlr.DlrName;
            dbDlr.DlrClassId = dlr.DlrClassId;
            dbDlr.Email = dlr.Email;
            dbDlr.DlrTypeId = dlr.DlrTypeId;
            dbDlr.DlrOpStatusId = dlr.DlrOpStatusId;
            dbDlr.DlrOpStatusReasonId = dlr.DlrOpStatusReasonId;
            dbDlr.EwhideFlag = dlr.EwhideFlag;
            dbDlr.IsPrivateSale = dlr.IsPrivateSale;
            dbDlr.RegNumber = dlr.RegNumber;
            dbDlr.RegStatusId = dlr.RegStatusId;
            dbDlr.RegExpirydateId = dlr.RegExpirydateId;
            dbDlr.Tc = dlr.Tc;

            _db.SaveChanges();

            return Ok(dlr);
        }
    }
}
