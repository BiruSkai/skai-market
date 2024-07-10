import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";


function App() {
  return (
    <Router>
      <div className="d-flex flex-column">
        <Nav />
        <div>
          <Switch>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
