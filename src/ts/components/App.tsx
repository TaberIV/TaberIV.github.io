import * as React from "react";
import { NavLink, Route } from "react-router-dom";
import CribDrag from "./pages/CribDrag";
import Home from "./pages/Home";

const App = () => (
  <div>
    <header>
      <h1>Taber McFarlin</h1>

      <nav>
        <ul>
          <li>
            <NavLink exact={true} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/CribDrag">Crib Drag Calculator</NavLink>
          </li>
        </ul>
      </nav>
    </header>

    <Route exact={true} path="/" component={Home} />
    <Route path="/CribDrag" component={CribDrag} />
  </div>
);

export default App;
