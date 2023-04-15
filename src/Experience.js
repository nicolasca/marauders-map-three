import { Perf } from "r3f-perf";
import { Map } from "./map/Map";
import { Entrance } from "./Title";
import { useControls } from "leva";
import { useState } from "react";
import { Vector3 } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Character } from "./Character";
import { OrbitControls, PivotControls, PresentationControls, useFBX, useGLTF, useTexture } from "@react-three/drei";
import { BulbLight } from "./BulbLight";

export default function Experience() {
  const [isMapOpened, setMapOpened] = useState(false);
  const { perfVisible, bulbPosition } = useControls({
    perfVisible: false,
    bulbPosition: [0, 5, 2],
  });

  return (
    <>
      <EffectComposer multisampling={4}>
        {perfVisible && <Perf position="top-left" />}

        <directionalLight castShadow position={[1, 2, 3]} intensity={0.1} />
        {/* <ambientLight intensity={0.5} /> */}

        <Entrance />
        <Map handleMapOpened={setMapOpened} />
        <Bloom mipmapBlur />

        {/* <PivotControls> */}
        <BulbLight position={bulbPosition} rotation-x={Math.PI / 2} />
        {/* </PivotControls> */}
        {isMapOpened && (
          <Character
            points={[
              new Vector3(-8.6, 0, 1),
              new Vector3(-8.6, 5, 1),
              new Vector3(-3, 2, 1),
              new Vector3(-8.6, 0, 1),
            ]}
            name={"Harry Potter"}
            pathLeftTexture="assets/footprint/footprint-left.png"
            pathRightTexture="assets/footprint/footprint-right.png"
            startAnimation={isMapOpened}
          />
        )}
      </EffectComposer>
    </>
  );
}
