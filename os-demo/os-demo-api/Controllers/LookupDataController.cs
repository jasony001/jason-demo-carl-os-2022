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
    public class LookupDataController : ControllerBase
    {
        private jyazure004dbContext _db;

        private readonly ILogger<WeatherForecastController> _logger;

        public LookupDataController(ILogger<WeatherForecastController> logger, jyazure004dbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        [Route("/api/LookupData")]

        public LookupData Get()
        {
            LookupData lookupData = new LookupData{
                dlrClassLookup = _db.LuDlrClasses.ToArray(),
                dlrTypeLookup = _db.LuDlrTypes.ToArray(),
                dlrOpStatusLookup = _db.LuDlrOpStatus.ToArray(),
                dlrOpStatusReasonLookup = _db.LuDlrOpStatusReasons.ToArray(),
                legTypeLookup = _db.LuLegTypes.ToArray(),
                partyRltnBranchLookup = _db.LuPartyRltnBranches.ToArray(),
                partyRltnRoleLookup = _db.LuPartyRltnRoles.ToArray(),
                partyRltnRoleCatLookup = _db.LuPartyRltnRoleCats.ToArray(),
                regExpiydateLookup = _db.LuRegExpiydates.ToArray(),
                regStatusLookup = _db.LuRegStatus.ToArray()
            };

            
            return lookupData;
        }
    }
}
