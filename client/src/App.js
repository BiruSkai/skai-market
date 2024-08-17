import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import MainAdvertisement from "./components/admin/MainAdvertisement";
import AdminAdvertisementUpdate from "./components/admin/AdminAdvertisementUpdate";
import Login from "./components/login/Login"
import Register from "./components/login/Register";
import Secret from "./components/Secret";



function App() {

  return (
    <Router>
      <div className="d-flex flex-column">
        <Nav />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin/advertisement" component={MainAdvertisement} />
            <Route exact path="/admin/advertisement/:id" component={AdminAdvertisementUpdate} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/secured-route" component={Secret} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
