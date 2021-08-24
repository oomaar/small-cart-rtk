import { Cart, Home } from "./screens";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  )
}
