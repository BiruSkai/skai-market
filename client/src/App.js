import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import MainAdvertisement from "./components/admin/MainAdvertisement";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column">
        <Nav />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin/advertisement" component={MainAdvertisement} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
