import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Entrance } from "./Title";
import Experience from "./Experience";
import { Leva } from "leva";

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 55, near: 0.1, position: [0, 0, 12] }}>
      <Environment
        background={false}
        near={1}
        far={1000}
        preset="warehouse"
        orientation={[5, 100, 10]}
      ></Environment>

      <Experience />
    </Canvas>
  );
};
