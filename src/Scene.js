import {
  Environment,
  OrbitControls,
  PivotControls,
  PresentationControls,
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
    <Canvas shadows camera={{ fov: 55, near: 0.1, position: [0, 5, 20] }}>
      <Suspense fallback={null}>
        {/* <axesHelper args={[2, 2, 2]} /> */}
        <color args={[new Color("#000000")]} attach="background" />
        <Experience />
        <OrbitControls
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI - 0.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          azimuth={[- 1, 0.75]}
        />
        {/* </Stage> */}
      </Suspense>
    </Canvas>
  );
};
