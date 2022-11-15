import { Center, Text3D, TransformControls } from "@react-three/drei";
import { TextureLoader } from "three";

export const Entrance = () => {
  // const { scene } = useThree();
  // const background = textureLoader.load("assets/hogwarts.jpg", (bgTexture) => {
  //   console.log(scene);
  //   scene.background = bgTexture;
  // });

  return (
    <>
      {/* <TransformControls mode="translate">
        <directionalLight intensity={2} />
      </TransformControls> */}

      {/* <TransformControls mode="rotate" position-y={5}> */}
      <Center position-y={5}>
        <Text3D
          fontSize={1.5}
          font={"assets/fonts/harry-potter.json"}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={10}
        >
          Marauder's map
          <meshStandardMaterial color="gold" metalness={0.8} roughness={0.1} />
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
