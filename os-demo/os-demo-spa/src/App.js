import "./App.css";
import React from "react";
import Start from "./Start";
import Main from "./components/nav/Main";
import { Route, Switch } from "react-router-dom";

import TestDataContextProvider from "./store/TestDataContextProvider";

// App is not wrapped inside TestDataContextProvider, has no access to the context
// need to wrap something

function App() {
    return (
        <TestDataContextProvider>
            <Switch>
                <Route path="/" exact>
                    <Start />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </TestDataContextProvider>
    );
}

export default App;
