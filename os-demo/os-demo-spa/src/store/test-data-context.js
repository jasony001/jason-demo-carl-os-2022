import React from "react";

const emptyTestData = {
    status: "EMPTY",
    dataSet: {
        info: { id: "", name: "", tester: "" },
        data: {
            individuals: [],
            dealerships: [],
            legalEntities: [],
            relationships: [],
        },
    },
    lookupData: {
        dlrClassLookup: [],
        dlrTypeLookup: [],
        dlrOpStatusLookup: [],
        dlrOpStatusReasonLookup: [],
        legTypeLookup: [],
        partyRltnBranchLookup: [],
        partyRltnRoleLookup: [],
        partyRltnRoleCatLookup: [],
        regExpiydateLookup: [],
        regStatusLookup: [],
    },
};

const testDataContext = React.createContext({
    testData: emptyTestData,
    setTestData: () => {},
});

export default testDataContext;
