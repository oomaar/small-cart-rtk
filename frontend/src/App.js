import { Cart, Home } from "./screens";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  )
}
