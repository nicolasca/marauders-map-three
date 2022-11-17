import { FootPrint } from "./FootPrint";
import { Perf } from "r3f-perf";
import { Map } from "./map/Map";
import { Entrance } from "./Title";
import { useControls } from "leva";
import { useState } from "react";

export default function Experience() {
  const [isMapOpened, setMapOpened] = useState(false);
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <Entrance />
      <Map handleMapOpened={setMapOpened} />

      {isMapOpened && (
        <FootPrint
          pathLeftTexture="assets/footprint/footprint-left.png"
          pathRightTexture="assets/footprint/footprint-right.png"
          startAnimation={isMapOpened}
        />
      )}
    </>
  );
}
