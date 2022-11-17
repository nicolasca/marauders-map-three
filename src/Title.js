import { Center, Text3D, TransformControls } from "@react-three/drei";
import { useControls } from "leva";
import { TextureLoader } from "three";

export const Entrance = () => {
  // const { scene } = useThree();
  // const background = textureLoader.load("assets/hogwarts.jpg", (bgTexture) => {
  //   console.log(scene);
  //   scene.background = bgTexture;
  // });
  const controls = useControls("Title", {
    size: {
      value: 1.5,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 10,
    color: "gold",
  });

  return (
    <>
      {/* <TransformControls mode="translate">
        <directionalLight intensity={2} />
      </TransformControls> */}

      {/* <TransformControls mode="rotate" position-y={5}> */}
      <Center position-y={5}>
        <Text3D
          size={controls.size}
          font={"assets/fonts/harry-potter.json"}
          curveSegments={controls.curveSegments}
          bevelEnabled={controls.bevelEnabled}
          bevelThickness={controls.bevelThickness}
          bevelSize={controls.bevelSize}
          bevelOffset={controls.bevelOffset}
          bevelSegments={controls.bevelSegments}
        >
          Marauder's map
          <meshStandardMaterial
            color={controls.color}
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
        {/* <Text3D
          position-y={-1}
          fontSize={1.5}
          font={"assets/fonts/harry-potter.json"}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={10}
        >
          Harry Potter
          <meshStandardMaterial
            color="rgb(255,226,155)"
            metalness={0.8}
            roughness={0.1}
          />
        </Text3D> */}
      </Center>
      {/* </TransformControls> */}
    </>
  );
};
