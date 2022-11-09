import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas camera={{ fov: 125, near: 1, position: [0, 0, 3] }}>
      <Experience />
    </Canvas>
  </>
);
