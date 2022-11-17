import "./style.css";
import ReactDOM from "react-dom/client";
import { Scene } from "./Scene";
import { StrictMode } from "react";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Leva />
    <Scene />
  </StrictMode>
);
