import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 55, near: 1, position: [0, 0, 2] }}>
      <Experience />
    </Canvas>
  );
};
