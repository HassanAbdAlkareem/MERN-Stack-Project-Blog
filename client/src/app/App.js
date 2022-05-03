import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Topbar from "../components/cmp-navbar/Topbar";
import SinglePage from "../pages/page-singlepost/SinglePage";
import Write from "../pages/page-write/Write";
import Home from "../pages/page-home/Home";
import Settings from "../pages/page-settings/Settings";
import Login from "../pages/page-login/Login";
import Register from "../pages/page-register/register";
import SideBar from "../components/cmp-home/SideBar";
import { UseGlobelContext } from "../context/FunctionAlContext";

function App() {
  console.log("render");
  const { user } = UseGlobelContext();
  return (
    <Router>
      <Topbar />

      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/register">{user ? <Home /> : <Register />}</Route>

        <Route path="/login">{user ? <Home /> : <Login />}</Route>

        <Route path="/write">{user ? <Write /> : <Register />}</Route>

        <Route path="/sidebar">
          {user ? (
            <div className="page-sidebar">
              <SideBar />
            </div>
          ) : (
            <Register />
          )}
        </Route>

        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>

        <Route path="/post/:psotId">
          <SinglePage />
        </Route>

        <Route path="*">
          <h1 style={{ textAlign: "center", color: "#666" }}>
            This Page Not Found !
          </h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
