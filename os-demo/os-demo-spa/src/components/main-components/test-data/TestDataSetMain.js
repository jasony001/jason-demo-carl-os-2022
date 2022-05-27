import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateTestDataSet from "./CreateTestDataSet";
import CurrentTestDataSet from "./CurrentTestDataSet";
import LoggedInUser from './LoggedInUser'
import SelectSavedTestDataSet from './SelectSavedTestDataSet';
import RelationshipDetails from './RelationshipDetails'

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
            <Route path="/TestDataSet/RelationshipDetails/:rltnId" exact>
                <RelationshipDetails />
            </Route>
        </Switch>
   )
}

export default TestDateSetMain
