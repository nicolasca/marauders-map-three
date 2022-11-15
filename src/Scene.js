import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Entrance } from "./Entrance";
import Experience from "./Experience";

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 55, near: 0.1, position: [0, 0, 12] }}>
      <Environment
        background={false}
        near={1}
        far={1000}
        // resolution={256}
        preset="warehouse"
        orientation={[5, 100, 10]}
      ></Environment>

      <Entrance />
      <Experience />
    </Canvas>
  );
};
