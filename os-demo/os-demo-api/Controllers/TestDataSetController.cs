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

    public class TestDataSetController : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<WeatherForecastController> _logger;

        public TestDataSetController(ILogger<WeatherForecastController> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("/api/TestDataSet/{id}")]
        public ActionResult<Models.TestDataSet> Get(long id)
        {

            DBModels.TestDataSet dbTestDataSet = _db.TestDataSets.FirstOrDefault(s => s.Id == id);
            if (dbTestDataSet == null) return NotFound();

            Models.Ind[] individuals = _db.Inds.Where(i => i.TestDataSetId == id).Select(i =>
                new Models.Ind
                {
                    PartyId = i.PartyId,
                    TestDataSetId = i.TestDataSetId,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    BirthDate = i.BirthDate,
                    Email = i.Email,
                    Gender = i.Gender,
                    StudentId = i.StudentId,
                    CertRequired = i.CertRequired,
                    CertDate = i.CertDate,
                    CertRequireDate = i.CertRequireDate,
                    UsesOmsWeb = i.UsesOmsWeb,
                    RegNumber = i.RegNumber,
                    RegStatusId = i.RegStatusId,
                    RegExpiydateId = i.RegExpiydateId,
                    Tc = i.Tc,
                }
            ).ToArray();

            Models.Dlr[] dealerships = _db.Dlrs.Where(i => i.TestDataSetId == id).Select(d =>
                new Models.Dlr
                {
                    PartyId = d.PartyId,
                    TestDataSetId = d.TestDataSetId,
                    LegPartyId = d.LegPartyId,
                    DlrName = d.DlrName,
                    DlrClassId = d.DlrClassId,
                    Email = d.Email,
                    DlrTypeId = d.DlrTypeId,
                    DlrOpStatusId = d.DlrOpStatusId,
                    DlrOpStatusReasonId = d.DlrOpStatusReasonId,
                    EwhideFlag = d.EwhideFlag,
                    IsPrivateSale = d.IsPrivateSale,
                    RegNumber = d.RegNumber,
                    RegStatusId = d.RegStatusId,
                    RegExpiydateId = d.RegExpiydateId,
                    Tc = d.Tc,
                }).ToArray();

            Models.Leg[] legalEntities = _db.Legs.Where(i => i.TestDataSetId == id).Select(l =>
            new Models.Leg
            {
                TestDataSetId = l.TestDataSetId,
                PartyId = l.PartyId,
                LegName = l.LegName,
                LegTypeId = l.LegTypeId
            }).ToArray();

            Models.PartyRltn[] partyRltns = _db.PartyRltns.Where(r => r.TestDataSetId == id).Select(r =>
                new Models.PartyRltn
                {
                    PartyRltnId = r.PartyRltnId,
                    TestDataSetId = r.TestDataSetId,
                    IsPrimary = r.IsPrimary,
                    IsApproved = r.IsApproved,
                    IndPartyId = r.IndPartyId,
                    DlrPartyId = r.DlrPartyId,
                    LegPartyId = r.LegPartyId,
                    PartyRltnRoleId = r.PartyRltnRoleId,
                    PartyRltnBranchId = r.PartyRltnBranchId,
                    IsReviewed = r.IsReviewed,
                    IsPersonInCharge = r.IsPersonInCharge
                }).ToArray();

            return Ok(new Models.TestDataSet
            {
                info = new TestDataSetInfo
                {
                    Id = dbTestDataSet.Id,
                    Name = dbTestDataSet.Name,
                    Tester = dbTestDataSet.Tester
                },
                individuals = individuals,
                dealerships = dealerships,
                legalEntities = legalEntities,
                partyRltns = partyRltns
            });
        }

        [HttpGet]
        [Route("/api/TestDataSets")]
        public ActionResult<IEnumerable<Models.TestDataSet>> GetAllTestDataSets()
        {
            DBModels.TestDataSet[] dbTestDataSets = _db.TestDataSets.Where(s => s.Id != 0).ToArray();

            return Ok(dbTestDataSets);
        }

        [HttpPost]
        [Route("/api/TestDataSet")]
        public ActionResult<Models.TestDataSet> CloneDefaultTestDataSet(TestDataSetInfo tdsInfo)
        {
            DBModels.TestDataSet newTestDataSet = new DBModels.TestDataSet { Id = tdsInfo.Id, Name = tdsInfo.Name, Tester = tdsInfo.Tester };
            _db.TestDataSets.Add(newTestDataSet);
            _db.SaveChanges();

            for (int i = 1; i <= 3; i++)
            {
                DBModels.Ind dbInd = new DBModels.Ind
                {
                    TestDataSetId = newTestDataSet.Id,
                    FirstName = "Ind",
                    LastName = ("ABC").Substring(i - 1, 1)
                };

                _db.Inds.Add(dbInd);

                DBModels.Leg dbLeg = new DBModels.Leg
                {
                    TestDataSetId = newTestDataSet.Id,
                    LegName = "Leg " + ("ABC").Substring(i - 1, 1),
                    LegTypeId = "CORP"
                };

                _db.Legs.Add(dbLeg);
                _db.SaveChanges();

                DBModels.Dlr dbDlr = new DBModels.Dlr
                {
                    TestDataSetId = newTestDataSet.Id,
                    LegPartyId = dbLeg.PartyId,
                    DlrName = "Dealer " + ("ABC").Substring(i - 1, 1),
                    DlrClassId = "GEN",
                    DlrTypeId = "NUMV",
                    DlrOpStatusId = "ACTIVE"
                };
                _db.Dlrs.Add(dbDlr);
                _db.SaveChanges();

                DBModels.PartyRltn dbRltn = new DBModels.PartyRltn
                {
                    TestDataSetId = newTestDataSet.Id,
                    LegPartyId = dbLeg.PartyId,
                    DlrPartyId = dbDlr.PartyId,
                    PartyRltnRoleId = "DLOWN"
                };
                _db.PartyRltns.Add(dbRltn);
                _db.SaveChanges();
            }

            return Ok(newTestDataSet.Id);


        }

    }
}
