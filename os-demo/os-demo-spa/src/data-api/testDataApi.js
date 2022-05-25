
const loadLocalSavedTestData = async () => {
  const localSavedTestDataSetId = localStorage.getItem("testDataSetId");

  if (!localSavedTestDataSetId) return { status: "EMPTY" };

  let lookupdata = await getLookupDataFromDB();
  let data = await getTestDataSetFromDB(localSavedTestDataSetId * 1);


  
  return {lookupData: lookupdata, data : data};
//   if (!testData) {
//     localStorage.removeItem("testDataSetId");
//     return { status: "EMPTY" };
//   } else {
//     return { status: "OK", dataSet: testData };
//   }
};

const getTestDataSetFromDB = async (id) => {
  const response = await fetch(
    `https://os-demo-api.azurewebsites.net/api/testdataset/${id}`
  );
  const testDataSet = response.json();

  return testDataSet;
};

const getLookupDataFromDB = async () => {
  const response = await fetch(
    `https://os-demo-api.azurewebsites.net/api/lookupdata`
  );
  const lookupData = response.json();

  return lookupData;
};

const createTestDataSet = async (name, tester) => {
  const response = await fetch(
    "https://os-demo-api.azurewebsites.net/api/testdataset",
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

const testDataApi = {
  loadLocalSavedTestData: loadLocalSavedTestData,
  getTestDataSetFromDB: getTestDataSetFromDB,
  createTestDataSet: createTestDataSet,
  getLookupDataFromDB: getLookupDataFromDB,
};

export default testDataApi;
