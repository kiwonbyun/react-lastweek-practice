import React, { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { actionCreators } from "./redux/modules/user";
import { useDispatch } from "react-redux";
import { apiKey } from "./shared/firebase";
import Upload from "./Upload";
import Detail from "./Detail";
import Notice from "./Notice";
import Edit from "./Edit";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  useEffect(() => {
    dispatch(actionCreators.loginCheckFB());
  }, []);
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/notice">
            <Notice />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
