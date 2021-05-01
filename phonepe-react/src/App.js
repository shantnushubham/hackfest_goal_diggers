import React from "react";
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

const App = () => {
  return (
    <Router>
      <div>
        <React.Suspense fallback={<span uk-spinner={"ratio: 4.5"} />}>
          <NavBar />
          <Switch>
            <Route path={"/"} exact component={HomePage} />
            <Route path={"/pending"} component={PendingTransactionsScreen} />
            <Route path={"/offline-cash"} component={PCashScreen} />
            <Route path={"/send-offline"} component={SendPCashScreen} />
            <Route path={"/signup"} component={SignUp} />
            <Route path={"/login"} component={Login} />
            <Route path={"/my-profile"} component={ProfilePage} />
            <Route path={"*"} component={() => <Redirect to={"/"} />} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};

export default App;
