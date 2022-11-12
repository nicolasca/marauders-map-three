import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 55, near: 1, position: [0, 0, 7] }}>
      <pointLight intensity={2} position={[7, 5, 1]} />

      <Experience />
    </Canvas>
  );
};
