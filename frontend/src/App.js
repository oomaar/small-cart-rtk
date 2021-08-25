import { Cart, Home, NotFound } from "./screens";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" component={NotFound} />
      </Switch>
    </Router>
  )
}
