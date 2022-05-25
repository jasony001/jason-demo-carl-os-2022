import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateTestDataSet from "./CreateTestDataSet";
import CurrentTestDataSet from "./CurrentTestDataSet";

const TestDateSetMain = () => {
   return (
       <Switch>
            <Route path="/TestDataSet" exact>
                <CurrentTestDataSet />
            </Route>
            <Route path="/TestDataSet/Create" exact>
                <CreateTestDataSet />
            </Route>
        </Switch>
   )
}

export default TestDateSetMain
