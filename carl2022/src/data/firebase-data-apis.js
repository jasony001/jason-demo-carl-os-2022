
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore"; 

const connectToFirestore = () => {
    const firebaseConfig = {

        apiKey: "AIzaSyDV_mUdzwORvFNPVcGuN0hEYe3kg1DxxM4",
        authDomain: "jason-demo-carl-os-2022.firebaseapp.com",
        projectId: "jason-demo-carl-os-2022",
        storageBucket: "jason-demo-carl-os-2022.appspot.com",
        messagingSenderId: "776998864894",
        appId: "1:776998864894:web:74062cfcad7f3338e622af",
        measurementId: "G-4RHTF112QY"
      };
    

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}

const addRecord = async (collectionName, keyColumnName, rec) => {
    const db = connectToFirestore();
    let {id, ...recObj} = rec

    await setDoc(doc(db, collectionName, id+""), recObj);
    return id;
}

const saveRecord = async (collectionName, keyColumnName, rec) => {
    const db = connectToFirestore();
    let {id, ...recObj} = rec

    await setDoc(doc(db, collectionName, id+""), recObj);
    return id;
}

const getAllRecordsInCollection = async (collectionName) =>{
    const db = connectToFirestore();
    const q = query(collection(db, collectionName));

    const recordList = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        recordList.push( doc.data() );
    });

    return recordList;
}

const getDocById = async (collectionName, id) => {
    const db = connectToFirestore();

    const docRef = doc(db, collectionName, id + "");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }

}

const searchRegistrant = async (keyword) => {
    if (keyword.length < 4){
        throw new Error('search key is at least 4 characters.')
    }
    let dlrList = []
    let indList = []

    const db = connectToFirestore();
    let q
    let querySnapshot

    if (!Number.isNaN(keyword * 1)){
        q = query(collection(db, 'dlrList'), where("RegNumber", "==", keyword*1));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dlrList.push(doc.data())
        });

        q = query(collection(db, 'indList'), where("RegNumber", "==", keyword*1));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            indList.push(doc.data())
        });
    } else { // search by firstname, lastname, dlrname: startswith
        q = query(collection(db, 'dlrList'), where("DlrName", ">=", keyword.toUpperCase()), where("DlrName", "<=", `${keyword.toUpperCase()}ZZ`));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dlrList.push(doc.data())
        });

        q = query(collection(db, 'legList'), where("legname", ">=", keyword.toUpperCase()), where("legname", "<=", `${keyword.toUpperCase()}ZZ`));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            let leg = doc.data()
            let qdlr = query(collection(db, 'dlrList'), where("LegPartyID", "==", leg.partyid * 1));
            let qDlrSnapshot
            qDlrSnapshot = await getDocs(qdlr);
            qDlrSnapshot.forEach((dlrDoc) => {
                let dlr = dlrDoc.data()
                dlr.legname = leg.legname
                dlrList.push(dlr)
            })
        });

        q = query(collection(db, 'indList'), where("FirstName", ">=", keyword.toUpperCase()), where("FirstName", "<=", `${keyword.toUpperCase()}ZZ`));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            indList.push(doc.data())
        });

        q = query(collection(db, 'indList'), where("LastName", ">=", keyword.toUpperCase()), where("LastName", "<=", `${keyword.toUpperCase()}ZZ`));
        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            indList.push(doc.data())
        });
    }
    
    return {indList: indList, dlrList:dlrList}
}

const getRltnList = async (indPartyId, dlrPartyId, legPartyId, rltnCatID) => {
    const db = connectToFirestore();
    let querySnapshot

    if (rltnCatID === "DA"){
        let daList = []
        let q 
        if (indPartyId) {
            q = query(collection(db, "daList"), where("dapartyid", "==", indPartyId))
        } else if (dlrPartyId) {
            q = query(collection(db, "daList"), where("dealerpartyid", "==", indPartyId))
        } else {
            return [];
        }

        querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let daRec = doc.data()
            daList.push(daRec);
        })

        return daList;
    }
    
    let partyId
        
    switch (rltnCatID)
    {
        case "ID":
            if ((!indPartyId && !dlrPartyId) || (indPartyId && dlrPartyId)) {
                return [];
            }
            
            partyId = indPartyId ? indPartyId : dlrPartyId;
            break;
        case "IL":
            if ((!indPartyId && !legPartyId) || (indPartyId && legPartyId)) {
                return [];
            }
            
            partyId = indPartyId ? indPartyId : legPartyId;
            break;
        case "DL":
            if ((!dlrPartyId && !legPartyId) || (dlrPartyId && legPartyId)) {
                return [];
            }
            
            partyId = dlrPartyId ? dlrPartyId : legPartyId;
            break;
        default:
            return [];
    }



    let qPartyID = query(collection(db, 'partyrltnList'), where("PartyID", "==", partyId), where("PartyRltnRoleCatID", "==", rltnCatID));
    let qRelatedPartyID = query(collection(db, 'partyrltnList'), where("RelatedPartyID", "==", partyId), where("PartyRltnRoleCatID", "==", rltnCatID));
    let docList = []

    querySnapshot = await getDocs(qPartyID);
    querySnapshot.forEach((doc) => {
        let rltn = doc.data()
        docList.push(rltn);
    })
    querySnapshot = await getDocs(qRelatedPartyID);
    querySnapshot.forEach((doc) => {
        let rltn = doc.data()
        if (!docList.some(r => r.PartyRltnID === rltn.PartyRltnID)){
            docList.push(rltn);
        }
    })


    docList = docList.map( r =>  {
        let ip, dp, lp
        if (indPartyId){
            ip = r.PartyID === indPartyId ? r.PartyID : r.RelatedPartyID
            dp = (rltnCatID === 'ID' ? (r.PartyID === indPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
            lp = (rltnCatID === 'IL' ? (r.PartyID === indPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
        } else if (dlrPartyId) {
            dp = r.PartyID === dlrPartyId ? r.PartyID : r.RelatedPartyID
            ip = (rltnCatID === 'ID' ? (r.PartyID === dlrPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
            lp = (rltnCatID === 'DL' ? (r.PartyID === dlrPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
        } else {
            lp = r.PartyID === legPartyId ? r.PartyID : r.RelatedPartyID
            ip = (rltnCatID === 'IL' ? (r.PartyID === legPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
            dp = (rltnCatID === 'DL' ? (r.PartyID === legPartyId ? r.RelatedPartyID : r.PartyID) : undefined)
        }


        return {...r, indPartyId: ip, dlrPartyId: dp, legPartyId: lp}
    })

    // docList.forEach(async r => {
    //     if (r.indPartyId) { r.ind = await getDocById("indList", r.indPartyId) }
    //     if (r.dlrPartyId) { r.dlr = getDocById("dlrList", r.dlrPartyId) }
    //     if (r.legPartyId) { r.leg = getDocById("legList", r.legPartyId) }
    // })

    
    return docList;
}

const FirebaseDataAPIs = {
    addRecord : addRecord, 
    getAllRecordsInCollection : getAllRecordsInCollection,
    searchRegistrant: searchRegistrant,
    saveRecord:saveRecord,
    getDocById: getDocById,
    getRltnList: getRltnList,
}

export default FirebaseDataAPIs;