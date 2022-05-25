import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DealershipProfile from "./DealershipProfile";
import DealershipApplications from "./DealershipApplications";
import DealershipInvoices from "./DealershipInvoices";

const DealershipMain = () => {
    return (
        <Switch>
            <Route path="/Dealership/Profile" exact>
                <DealershipProfile />
            </Route>
            <Route path="/Dealership/Applications" exact>
                <DealershipApplications />
            </Route>
            <Route path="/Dealership/Invoices" exact>
                <DealershipInvoices />
            </Route>
            <Route path="/Dealership" exact>
                <Redirect to="/Dealership/Profile" />
            </Route>
        </Switch>
    );
};

export default DealershipMain;
