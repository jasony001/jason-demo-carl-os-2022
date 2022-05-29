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

    public class LegalEntityController : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<LegalEntityController> _logger;

        public LegalEntityController(ILogger<LegalEntityController> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }



        [HttpGet]
        [Route("/api/LegalEntities/{id}")]
        public ActionResult<Models.Leg> Get(int id)
        {

            DBModels.Leg leg = _db.Legs.FirstOrDefault(l => l.PartyId == id);
            if (leg == null) return NotFound();

            return Ok(new Models.Leg
            {
                PartyId = leg.PartyId,
                TestDataSetId = leg.TestDataSetId,
                LegName = leg.LegName,
                LegTypeId = leg.LegTypeId,
            });
        }


        [HttpPut]
        [Route("/api/LegalEntities")]
        public ActionResult<Models.Leg> SavePartyRltn(Models.Leg leg)
        {
            DBModels.Leg dbLeg = _db.Legs.FirstOrDefault(l => l.PartyId == leg.PartyId);
            if (dbLeg == null)
            {
                return NotFound();
            }

            dbLeg.PartyId = leg.PartyId;
            dbLeg.TestDataSetId = leg.TestDataSetId;
            dbLeg.LegName = leg.LegName;
            dbLeg.LegTypeId = leg.LegTypeId;
            
            _db.SaveChanges();

            return Ok(leg);
        }
    }
}
