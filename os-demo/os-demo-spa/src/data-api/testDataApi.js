
const apiRootUrl = "https://os-demo-api.azurewebsites.net";
        // "https://localhost:5001/api/PartyRltns",




const loadLocalSavedTestData = async () => {
  const localSavedTestDataSetId = localStorage.getItem("testDataSetId");

  if (!localSavedTestDataSetId) return { status: "EMPTY" };

  let lookupdata = await getLookupDataFromDB();
  let data = await getTestDataSetFromDB(localSavedTestDataSetId * 1);

  return {lookupData: lookupdata, data : data};

};

const getTestDataSetFromDB = async (id) => {
  const response = await fetch(
    `${apiRootUrl}/api/testdataset/${id}`
  );
  const testDataSet = response.json();

  return testDataSet;
};

const getAllTestDataSets = async () => {
    const response = await fetch(
      `${apiRootUrl}/api/testdatasets`
    );
    const testDataSets = response.json();
  
    return testDataSets;
  };

const getLookupDataFromDB = async () => {
  const response = await fetch(
    `${apiRootUrl}/api/lookupdata`
  );
  const lookupData = response.json();

  return lookupData;
};

const createTestDataSet = async (name, tester) => {
  const response = await fetch(
    "${apiRootUrl}/api/testdataset",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: new Date().getTime(),
        Name: name,
        Tester: tester,
      }),
    }
  );

  const testDataSetId = await response.json();
  const testDataSet = await getTestDataSetFromDB(testDataSetId);

  return testDataSet;
};

const deleteTestDataSet = async id => {
    await fetch(
        `${apiRootUrl}/api/TestDataSet/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
}

const getRelationshipById = async (id) => {
    const response = await fetch(
        `${apiRootUrl}/api/PartyRltns/${id}`
      );
      const testDataSet = response.json();
    
      return testDataSet;
}

const createReletionship = async (rltn) => {
    const response = await fetch(
        `${apiRootUrl}/api/PartyRltns`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rltn),
        }
      );
    
      const newRltn = await response.json();
    
      return newRltn;
}



const saveRelationship = async (rltn) => {
    const response = await fetch(
        `${apiRootUrl}/api/PartyRltns`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rltn),
        }
      );
    
      const updatedRltn = await response.json();
    
      return updatedRltn;
}

const deleteRelationship = async (id) => {
    await fetch(
        `${apiRootUrl}/api/PartyRltns/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
}

const getDealershipById = async (id) => {
    const response = await fetch(
        `${apiRootUrl}/api/Dealerships/${id}`
      );
      const testDataSet = response.json();
    
      return testDataSet;
}


const saveDealership = async (dlr) => {
    const response = await fetch(
        `${apiRootUrl}/api/Dealerships`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dlr),
        }
      );
    
      const updatedDlr = await response.json();
    
      return updatedDlr;
}

const getIndividualById = async (id) => {
    const response = await fetch(
        `${apiRootUrl}/api/Individuals/${id}`
      );
      const testDataSet = response.json();
    
      return testDataSet;
}


const saveIndividual = async (ind) => {

    const response = await fetch(
        `${apiRootUrl}/api/Individuals`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ind),
        }
      );
    
      const updatedInd = await response.json();
    
      return updatedInd;
}

const getLegalEntityById = async (id) => {
    const response = await fetch(
        `${apiRootUrl}/api/LegalEntities/${id}`
      );
      const testDataSet = response.json();
    
      return testDataSet;
}


const saveLegalEntity = async (leg) => {

    const response = await fetch(
        `${apiRootUrl}/api/LegalEntities`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leg),
        }
      );
    
      const updatedLeg = await response.json();
    
      return updatedLeg;
}

const testDataApi = {
  loadLocalSavedTestData: loadLocalSavedTestData,
  getTestDataSetFromDB: getTestDataSetFromDB,
  createTestDataSet: createTestDataSet,
  getLookupDataFromDB: getLookupDataFromDB,
  getAllTestDataSets: getAllTestDataSets,
  deleteTestDataSet: deleteTestDataSet,
  createReletionship : createReletionship,
  getRelationshipById: getRelationshipById,
  saveRelationship : saveRelationship,
  deleteRelationship:deleteRelationship,
  getDealershipById: getDealershipById,
  saveDealership: saveDealership,
  getIndividualById: getIndividualById,
  saveIndividual: saveIndividual,
  getLegalEntityById: getLegalEntityById,
  saveLegalEntity: saveLegalEntity,
};

export default testDataApi;
