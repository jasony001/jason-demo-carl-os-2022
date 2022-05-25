import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import IndividualProfile from "./IndividualProfile";
import IndividualApplications from "./IndividualApplications";
import IndividualInvoices from "./IndividualInvoices";

const IndividualMain = () => {
    return (
        <Switch>
            <Route path="/Individual/Profile" exact>
                <IndividualProfile />
            </Route>
            <Route path="/Individual/Applications" exact>
                <IndividualApplications />
            </Route>
            <Route path="/Individual/Invoices" exact>
                <IndividualInvoices />
            </Route>
            <Route path="/Individual">
                <Redirect to="/Individual/Profile" />
            </Route>
        </Switch>
    );
};

export default IndividualMain;
