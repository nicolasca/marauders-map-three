import {
  Environment,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Entrance } from "./Title";
import Experience from "./Experience";
import { Leva } from "leva";
import { DirectionalLight } from "three";

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 55, near: 0.1, position: [0, 0, 12] }}>
      <PivotControls offset={[-10, 0, 1]}>
        <directionalLight
          intensity={2}
          position-z={3}
          position-x={-3}
          rotation-y={Math.PI / 4}
        />
      </PivotControls>
      {/* <Environment
        background={false}
        near={1}
        far={1000}
        preset="warehouse"
        orientation={[5, 100, 10]}
      ></Environment> */}

      <Experience />
    </Canvas>
  );
};
