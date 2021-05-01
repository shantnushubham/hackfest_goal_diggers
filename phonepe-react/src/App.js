import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NavBar from "./components/NavBar";
const HomePage = React.lazy(() => import("./components/HomePage"));
const PCashScreen = React.lazy(() => import("./components/PCashScreen"));
const SendPCashScreen = React.lazy(() =>
  import("./components/SendPCashScreen")
);
const PendingTransactionsScreen = React.lazy(() =>
  import("./components/PendingTransactionScreen")
);
const SignUp = React.lazy(() => import("./components/SignUp"));
const Login = React.lazy(() => import("./components/Login"));
const ProfilePage = React.lazy(() => import("./components/ProfilePage"));
const PCashSend = React.lazy(() => import("./components/PCashSend"));
const PCashReceive = React.lazy(() => import("./components/PCashReceive"));

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (user === null && loggedInUser) {
      setUser(JSON.parse(loggedInUser).user);
    }
  }, [user]);

  return (
    <Router>
      <div>
        <React.Suspense fallback={<span uk-spinner={"ratio: 4.5"} />}>
          <NavBar user={user} setUser={setUser} />
          <Switch>
            <Route
              path={"/"}
              exact
              component={() => <HomePage user={user} />}
            />
            <Route
              path={"/pending"}
              component={() => <PendingTransactionsScreen user={user} />}
            />
            <Route
              path={"/send-offline/amount-page"}
              component={() => <PCashSend user={user} />}
            />
            <Route
              path={"/offline-cash"}
              component={() => <PCashScreen user={user} />}
            />
            <Route
              path={"/send-offline"}
              exact
              component={() => <SendPCashScreen />}
            />
            <Route
              path={"/receive-offline"}
              exact
              component={() => <PCashReceive user={user} />}
            />
            <Route
              path={"/signup"}
              component={() => <SignUp user={user} setUser={setUser} />}
            />
            <Route
              path={"/login"}
              component={() => <Login setUser={setUser} />}
            />
            <Route
              path={"/my-profile"}
              component={() => <ProfilePage user={user} />}
            />
            <Route path={"*"} component={() => <Redirect to={"/"} />} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
