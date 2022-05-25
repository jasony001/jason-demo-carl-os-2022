import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ChangePassword from './ChangePassword'


const AccountMain = () => {
   return (
       <Switch>
            <Route path="/Account/ChangePassword" exact>
                <ChangePassword />
            </Route>
            <Route path="/Account">
                <Redirect to="/Account/ChangePassword"/>
            </Route>
        </Switch>
   )
}

export default AccountMain
