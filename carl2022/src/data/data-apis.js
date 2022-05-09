import FirebaseDataAPIs from "./firebase-data-apis"

const getAllRecordsInCollection = async (collectionName) =>{
    const recordList = await FirebaseDataAPIs.getAllRecordsInCollection(collectionName)

    return recordList;
}

const loadAllLookupData = async (dataCollectionList) => {
    const allDataCollection = {}

    dataCollectionList.filter(c => c.collectionName.toLowerCase().startsWith('lud')).forEach(c => {
        dataAPIs.getAllRecordsInCollection(c.collectionName)
        .then(d => { allDataCollection[c.collectionName] = d })
    })

    return allDataCollection
}

const searchRegistrant = async (keyword) => {
    return await FirebaseDataAPIs.searchRegistrant(keyword)
}

const saveRecord = async (collectionName, keyColumnName, rec) => {
    await FirebaseDataAPIs.saveRecord(collectionName, keyColumnName, rec)
}

// const getLegByPartyId = (partyId) => {
//     FirebaseDataAPIs.getDocById("legList", partyId)
//     .then(d => {return d})
// }

const getRltnList = async (indPartyId, dlrPartyId, legPartyId, rltnCategory) => {
    console.log(`dataAPIs.getRltnList(${indPartyId}, ${dlrPartyId}, ${legPartyId}, 'ID')`)
    let rltnList = await FirebaseDataAPIs.getRltnList(indPartyId, dlrPartyId, legPartyId, rltnCategory)

    console.log(rltnList)
    return rltnList;
}

const dataAPIs = {
    getAllRecordsInCollection: getAllRecordsInCollection,
    loadAllData: loadAllLookupData,
    searchRegistrant:searchRegistrant,
    saveRecord : saveRecord,
    // getLegByPartyId: getLegByPartyId,
    getRltnList : getRltnList,
}

export default dataAPIs;