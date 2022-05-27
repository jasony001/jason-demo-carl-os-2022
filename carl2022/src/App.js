import "./App.css";
import PopulateData from "./data/populate-data";
import React from "react";
import dataAPIs from "./data/data-apis";
import Search from "./components/Search";
import Main from "./components/Main";

function App() {
    const dataCollectionList = [
        { collectionName: "dlrList", keyColumnName: "PartyID" },
        { collectionName: "legList", keyColumnName: "partyid" },
        { collectionName: "daList", keyColumnName: "daId" },
        { collectionName: "indList", keyColumnName: "PartyID" },
        { collectionName: "luDlrClassList", keyColumnName: "DlrClassID" },
        { collectionName: "luDlrOpStatusList", keyColumnName: "DlrOpStatusID" },
        {
            collectionName: "luDlrOpStatusReasonList",
            keyColumnName: "DlrOpStatusReasonID",
        },
        { collectionName: "luDlrTypeList", keyColumnName: "DlrtypeID" },
        { collectionName: "luLegTypeList", keyColumnName: "LegTypeID" },
        {
            collectionName: "luPartyRltnBranchList",
            keyColumnName: "PartyRltnBranchID",
        },
        {
            collectionName: "luPartyRltnRoleList",
            keyColumnName: "PartyRltnRoleID",
        },
        { collectionName: "luRegStatusList", keyColumnName: "RegStatusID" },
        {
            collectionName: "luRegStatusReasonList",
            keyColumnName: "RegStatusReasonID",
        },
        { collectionName: "partyrltnList", keyColumnName: "PartyRltnID" },
    ];

    const loadAllLookupData = () => {
        let allTestData = {};
        if (!localStorage.getItem("lookupData")) {
            dataAPIs.loadAllData(dataCollectionList).then((d) => {
                localStorage.setItem("lookupData", JSON.stringify(d));
            });
        } else {
        }
    };

    const [lookupData, setLookupData] = React.useState({
        luDlrClassList: [
            {
                DlrClassID: "BROKER",
                description: "Broker",
            },
            {
                DlrClassID: "EXPORT",
                description: "Exporter",
            },
            {
                DlrClassID: "FLEET",
                description: "Fleet Lessor",
            },
            {
                DlrClassID: "GEN",
                description: "General Dealer",
            },
            {
                DlrClassID: "LEASIN",
                description: "Lease Finance Dealer",
            },
            {
                DlrClassID: "MANUFA",
                description: "Manufacturer",
            },
            {
                DlrClassID: "NFP",
                description: "Not for Profit",
            },
            {
                DlrClassID: "OOP",
                description: "Out of Province",
            },
            {
                DlrClassID: "UNKNOW",
                description: "Unknown",
            },
            {
                DlrClassID: "WHOLES",
                description: "Wholesaler",
            },
        ],
        luDlrOpStatusList: [
            {
                DlrOpStatusID: "ACTIVE",
                description: "Active",
            },
            {
                DlrOpStatusID: "INACTI",
                description: "Inactive",
            },
        ],
        luDlrOpStatusReasonList: [
            {
                DlrOpStatusReasonID: "NOSALE",
                description: "No Salesperson",
            },
            {
                DlrOpStatusReasonID: "NOSOFF",
                description: "No Salesperson/Off Premises",
            },
            {
                DlrOpStatusReasonID: "OFFPRE",
                description: "Off Premises",
            },
        ],
        luDlrTypeList: [
            {
                DlrTypeID: "COM",
                description: "Commercial",
            },
            {
                DlrTypeID: "NUMV",
                description: "New and Used Motor Vehicles",
            },
            {
                DlrTypeID: "UMV",
                description: "Used Motor Vehicles",
            },
        ],
        luLegTypeList: [
            {
                LegTypeID: "CORP",
                description: "Corporation",
            },
            {
                LegTypeID: "GENPAR",
                description: "General Partnership",
            },
            {
                LegTypeID: "LIMPAR",
                description: "Limited Partnership",
            },
            {
                LegTypeID: "MVDA",
                description: "MVDA 2002",
            },
            {
                LegTypeID: "OFF",
                description: "Offsite",
            },
            {
                LegTypeID: "SOLE",
                description: "Sole Proprietor",
            },
            {
                LegTypeID: "UNKNWN",
                description: "Unknown",
            },
        ],
        luPartyRltnBranchList: [
            {
                PartyRltnBranchID: "B",
                description: "Branch",
            },
            {
                PartyRltnBranchID: "H",
                description: "Head Office",
            },
        ],
        luPartyRltnRoleList: [
            {
                PartyRltnRoleID: "DDINTP",
                description: "Interested Person",
            },
            {
                PartyRltnRoleID: "DDLAND",
                description: "Landlord",
            },
            {
                PartyRltnRoleID: "DDOFFS",
                description: "Offsite Sale Participant",
            },
            {
                PartyRltnRoleID: "DDXREF",
                description: "Cross Reference",
            },
            {
                PartyRltnRoleID: "DLOWN",
                description: "Owned",
            },
            {
                PartyRltnRoleID: "FLEETM",
                description: "Fleet Manager",
            },
            {
                PartyRltnRoleID: "IDBUS",
                description: "Business Manager",
            },
            {
                PartyRltnRoleID: "IDCOMR",
                description: "Dealer Complaint Rep",
            },
            {
                PartyRltnRoleID: "IDCONT",
                description: "Contact",
            },
            {
                PartyRltnRoleID: "IDDLRP",
                description: "Dealer Principal",
            },
            {
                PartyRltnRoleID: "IDEMP",
                description: "Employee",
            },
            {
                PartyRltnRoleID: "IDFNMN",
                description: "Finance Manager",
            },
            {
                PartyRltnRoleID: "IDGEN",
                description: "General Manager",
            },
            {
                PartyRltnRoleID: "IDGSMN",
                description: "General Sales Manager",
            },
            {
                PartyRltnRoleID: "IDINTP",
                description: "Interested Person",
            },
            {
                PartyRltnRoleID: "IDLAND",
                description: "Landlord",
            },
            {
                PartyRltnRoleID: "IDLEND",
                description: "Lender",
            },
            {
                PartyRltnRoleID: "IDMARK",
                description: "Marketing Manager",
            },
            {
                PartyRltnRoleID: "IDMECH",
                description: "Mechanic",
            },
            {
                PartyRltnRoleID: "IDNCMN",
                description: "New Car Manager",
            },
            {
                PartyRltnRoleID: "IDOFAM",
                description: "Offsite Sale Advertising Manager",
            },
            {
                PartyRltnRoleID: "IDOFSS",
                description: "Offsite Sale Salesperson",
            },
            {
                PartyRltnRoleID: "IDOFTM",
                description: "Offsite Sale Trade Manager",
            },
            {
                PartyRltnRoleID: "IDREGC",
                description: "Registration Contact",
            },
            {
                PartyRltnRoleID: "IDSALE",
                description: "Salesperson",
            },
            {
                PartyRltnRoleID: "IDSALM",
                description: "Sales Manager",
            },
            {
                PartyRltnRoleID: "IDSEC",
                description: "Secretary Treasurer",
            },
            {
                PartyRltnRoleID: "IDSIGB",
                description: "Signing Authority - Bank",
            },
            {
                PartyRltnRoleID: "IDSIGN",
                description: "Signing Authority - Other",
            },
            {
                PartyRltnRoleID: "IDSIGT",
                description: "Signing Authority - Trust",
            },
            {
                PartyRltnRoleID: "IDUCMN",
                description: "Used Car Manager",
            },
            {
                PartyRltnRoleID: "IDUREG",
                description: "Unregistered Salesperson",
            },
            {
                PartyRltnRoleID: "IIASS",
                description: "Associate",
            },
            {
                PartyRltnRoleID: "IIASSC",
                description: "Associated Person",
            },
            {
                PartyRltnRoleID: "IIREL",
                description: "Relative",
            },
            {
                PartyRltnRoleID: "IIXREF",
                description: "Cross Reference",
            },
            {
                PartyRltnRoleID: "ILASSC",
                description: "Associated Person",
            },
            {
                PartyRltnRoleID: "ILDIR",
                description: "Director",
            },
            {
                PartyRltnRoleID: "ILFO",
                description: "Financial Officer",
            },
            {
                PartyRltnRoleID: "ILINTP",
                description: "Interested Person",
            },
            {
                PartyRltnRoleID: "ILOFF",
                description: "Officer",
            },
            {
                PartyRltnRoleID: "ILOWN",
                description: "Owner",
            },
            {
                PartyRltnRoleID: "ILPART",
                description: "Partner",
            },
            {
                PartyRltnRoleID: "ILSHAR",
                description: "Shareholder",
            },
            {
                PartyRltnRoleID: "LEASEM",
                description: "Leasing Manager",
            },
            {
                PartyRltnRoleID: "LLAMAL",
                description: "Amalgamated With",
            },
            {
                PartyRltnRoleID: "LLASSC",
                description: "Associated Person",
            },
            {
                PartyRltnRoleID: "LLDUAL",
                description: "Dual With",
            },
            {
                PartyRltnRoleID: "LLINTP",
                description: "Interested Person",
            },
            {
                PartyRltnRoleID: "LLOWN",
                description: "Owner/Owned By",
            },
            {
                PartyRltnRoleID: "LLPART",
                description: "Partnership",
            },
            {
                PartyRltnRoleID: "LLSHAR",
                description: "Shareholder",
            },
            {
                PartyRltnRoleID: "LLXREF",
                description: "Cross Reference",
            },
        ],
        luRegStatusList: [
            {
                RegStatusID: "NOTREG",
                description: "Not Registered",
            },
            {
                RegStatusID: "REG",
                description: "Registered",
            },
            {
                RegStatusID: "TERM",
                description: "Terminated",
            },
        ],
        luRegStatusReasonList: [
            {
                RegStatusReasonID: "ABANDO",
                description: "Abandoned",
            },
            {
                RegStatusReasonID: "APPROV",
                description: "Approved",
            },
            {
                RegStatusReasonID: "AUTO",
                description: "Auto Terminated",
            },
            {
                RegStatusReasonID: "CANCEL",
                description: "Cancelled",
            },
            {
                RegStatusReasonID: "CONAPP",
                description: "Conditional Approval",
            },
            {
                RegStatusReasonID: "CONEXP",
                description: "Conditional Period Expired",
            },
            {
                RegStatusReasonID: "LAPSED",
                description: "Lapsed",
            },
            {
                RegStatusReasonID: "NOPAY",
                description: "No Payment",
            },
            {
                RegStatusReasonID: "REVOKE",
                description: "Revoked",
            },
            {
                RegStatusReasonID: "SUSP",
                description: "Suspended",
            },
            {
                RegStatusReasonID: "TERMBD",
                description: "Terminated By Dealer",
            },
            {
                RegStatusReasonID: "VOL",
                description: "Voluntary",
            },
        ],
    });

    return (
        <div className="App">
            {/* CARL2022
      <PopulateData dataCollectionList = { dataCollectionList } />
      CARL2022 */}
            {/* <button onClick={loadAllData}>load all data</button> */}
            <Main lookupData={lookupData} />
        </div>
    );
}

export default App;
