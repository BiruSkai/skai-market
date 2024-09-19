import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { selectIsLoggedIn } from "./features/users/usersSlice";
import { fetchAllProducts } from "./features/products/productsSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import MainAdvertisement from "./components/admin/MainAdvertisement";
import AdminAdvertisementUpdate from "./components/admin/AdminAdvertisementUpdate";
import Login from "./components/login/Login"
import Register from "./components/login/Register";
import Secret from "./components/Secret";


const promise = loadStripe("pk_test_51PXhfPHXtOhtQmpM3zJNiSlgtkNpYmyN7Pkt3e5wx7W0h5kzI0BznPvq9yy0SiUqX0xIG9qs0OHBuHR44jF5ytYd00luYW6qYa")

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <Elements stripe={promise}>
      <Router>
        <div className="d-flex flex-column min-h-screen">
          <Nav />
          <div className="mt-24 flex flex-col flex-grow ">
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
    </Elements>
  );
}

export default App;
