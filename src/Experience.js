import { Perf } from "r3f-perf";
import { Map } from "./map/Map";
import { Entrance } from "./Title";
import { useControls } from "leva";
import { useState } from "react";
import { Vector3 } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Character } from "./Character";
import { PivotControls, useFBX, useGLTF, useTexture } from "@react-three/drei";
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
        <Entrance />
        <Map handleMapOpened={setMapOpened} />
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
