import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DealershipProfile from "./DealershipProfile";
import DealershipApplications from "./DealershipApplications";
import DealershipInvoices from "./DealershipInvoices";
import NotificationSubscription from "./NotificationSubscription";
import ManageDA from "./ManageDA";
import DealershipOMVICCertificate from "./DealershipOMVICCertificate";

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
            <Route path="/dealership/notificationsubscription" exact>
                <NotificationSubscription />
            </Route>
            <Route path="/dealership/manageDA" exact>
                <ManageDA />
            </Route>
            <Route path="/dealership/OMVICCertificate" exact>
                <DealershipOMVICCertificate />
            </Route>
            <Route path="/Dealership" exact>
                <Redirect to="/Dealership/Profile" />
            </Route>
        </Switch>
    );
};

export default DealershipMain;
