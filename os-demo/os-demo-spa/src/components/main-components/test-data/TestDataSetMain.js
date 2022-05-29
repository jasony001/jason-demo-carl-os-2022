import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateTestDataSet from "./test-data-sets/CreateTestDataSet";
import CurrentTestDataSet from "./test-data-sets/CurrentTestDataSet";
import SelectSavedTestDataSet from './test-data-sets/SelectSavedTestDataSet';
import RelationshipDetails from './relationships/RelationshipDetails'
import DealershipDetails from './dealerships/DealershipDetails';
import IndividualDetails from './individuals/IndividualDetails';
import LegalEntityDetails from './legal-etities/LegalEntityDetails'

const TestDateSetMain = () => {
   return (
       <Switch>
            <Route path="/TestDataSet/Setup" exact>
                <CurrentTestDataSet />
            </Route>
            <Route path="/TestDataSet/Create" exact>
                <CreateTestDataSet />
            </Route>
            <Route path="/TestDataSet/Select" exact>
                <SelectSavedTestDataSet />
            </Route>
            <Route path="/TestDataSet/Relationships/:rltnId" exact>
                <RelationshipDetails />
            </Route>
            <Route path="/TestDataSet/Dealerships/:dlrPartyId" exact>
                <DealershipDetails />
            </Route>
            <Route path="/TestDataSet/Individuals/:indPartyId" exact>
                <IndividualDetails />
            </Route>
            <Route path="/TestDataSet/LegalEntities/:legPartyId" exact>
                <LegalEntityDetails />
            </Route>
        </Switch>
   )
}

export default TestDateSetMain
