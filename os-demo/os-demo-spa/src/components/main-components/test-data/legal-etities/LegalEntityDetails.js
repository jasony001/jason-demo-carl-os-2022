import React from "react";
import styles from "./LegalEnityDetails.module.css";
import { useParams, useHistory } from "react-router-dom";
import testDataApi from "../../../../data-api/testDataApi";
import testDataContext from "../../../../store/test-data-context";

const LegalEnityDetails = () => {
    const history = useHistory();
    const { legPartyId } = useParams();
    const { testData, setTestData } = React.useContext(testDataContext);
    const [updatedLegalEnity, setUpdatedLegalEnity] = React.useState({
        partyId: -1,
        testDataSetId: testData.dataSet.info.id,
        legName: "",
        legTypeId: "",
    });

    React.useEffect(() => {
        if (legPartyId > 0) {
            testDataApi.getLegalEntityById(legPartyId).then((d) => {
                if (d.testDataSetId) {
                    let r = {
                        ...d,
                        legName: d.legName ?? "",
                        legTypeId: d.legTypeId ?? "",
                    };
                    setUpdatedLegalEnity(r);
                }
            });
        }
    }, [legPartyId]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let leg = { ...updatedLegalEnity };

        if (!leg.legTypeId) {
            alert("a legal type must be selected");
            return;
        }

        if (!leg.legName) {
            alert("legName is required");
            return;
        }

        testDataApi.saveLegalEntity(leg).then((r) => {
            if (!r.status) {
                setTestData((prev) => {
                    return {
                        ...prev,
                        dataSet: {
                            ...prev.dataSet,
                            legalEntities: [
                                ...prev.dataSet.legalEntities.map((er) =>
                                    er.partyId === r.partyId ? r : er
                                ),
                            ],
                        },
                    };
                });
            }
        });
        history.push("/TestDataSet/Setup");
    };

    const inputChangeHandler = (e) => {
        let newValue =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUpdatedLegalEnity((prev) => {
            return {
                ...prev,
                [e.target.name]: newValue,
            };
        });
    };


    return (
        <div className={styles["legal-entity-details"]}>
            <h1>LegalEnity Details </h1>
            <form
                onSubmit={formSubmitHandler}
                className={styles["legal-entity-form"]}
            >
                <label>Id</label>
                <label>
                    {updatedLegalEnity.partyId > 0
                        ? updatedLegalEnity.partyId
                        : ""}
                </label>
                <label>Name</label>
                <input
                    name="legName"
                    value={updatedLegalEnity.legName}
                    onChange={inputChangeHandler}
                ></input>

                <label>Type</label>
                <select
                    name="legTypeId"
                    value={updatedLegalEnity.legTypeId}
                    onChange={inputChangeHandler}
                >
                    <option value="">&lt;select&gt;</option>
                    {testData.lookupData.legTypeLookup
                        
                        .sort((r1, r2) => r1.description > r2.description)
                        .map((r) => {
                            return (
                                <option value={r.legTypeId} key={r.legTypeId}>
                                    {r.description}
                                </option>
                            );
                        })}
                </select>

                <button>Save</button>
            </form>
        </div>
    );
};

export default LegalEnityDetails;
