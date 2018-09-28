import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/main.css";
import App from "./ts/components/App";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
