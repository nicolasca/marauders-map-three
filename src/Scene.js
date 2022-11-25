import {
  Environment,
  PivotControls,
  Stage,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Entrance } from "./Title";
import Experience from "./Experience";
import { Leva } from "leva";
import { Color, DirectionalLight } from "three";
import { Suspense } from "react";

export const Scene = () => {
  return (
    <Canvas shadows camera={{ fov: 55, near: 0.1, position: [0, 0, 25] }}>
      <Suspense fallback={null}>
        {/* <PivotControls offset={[-10, 0, 1]}>
        <directionalLight
          castShadow
          color={"white"}
          intensity={2}
          position-z={3}
          position-x={-3}
          rotation-y={Math.PI / 4}
        />
      </PivotControls> */}
        {/* <Environment
        background={false}
        near={1}
        far={1000}
        preset="warehouse"
        orientation={[5, 100, 10]}
      ></Environment> */}
        <axesHelper args={[2, 2, 2]} />
        <color args={[new Color("#000000")]} attach="background" />
        {/* <Stage
          contactShadow
          shadows
          adjustCamera
          intensity={1}
          environment="park"
          preset="rembrandt"
        > */}
        <Experience />
        {/* </Stage> */}
      </Suspense>
    </Canvas>
  );
};
