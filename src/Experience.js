import { FootPrint } from "./FootPrint";
import { Perf } from "r3f-perf";
import { Map } from "./map/Map";
import { Entrance } from "./Title";
import { useControls } from "leva";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: false,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <Entrance />
      <Map />

      {/* {isOpeningOver && (
        <FootPrint
          pathLeftTexture="assets/footprint/footprint-left.png"
          pathRightTexture="assets/footprint/footprint-right.png"
        />
      )} */}
    </>
  );
}
