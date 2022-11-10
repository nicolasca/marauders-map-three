import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";
import { useControls } from "leva";

import { MathUtils, TextureLoader, DoubleSide } from "three";

export default function Experience() {
  const [displayMap, setDisplayMap] = useState(false);
  const [hovered, setHovered] = useState();
  const planeRef = useRef();
  const planeRefToShow = useRef();
  const planeLeft = useRef();
  const planeRight = useRef();
  const groupLeft = useRef();

  useCursor(hovered /*'pointer', 'auto'*/);

  const maraudersMapHidden = useLoader(
    TextureLoader,
    "assets/marauders-map-hidden.png"
  );
  const maraudersMapShow = useLoader(TextureLoader, "assets/marauders-map.jpg");
  const maraudersMapCenter = useLoader(
    TextureLoader,
    "assets/marauders-center.jpg"
  );
  const maraudersMapLeft = useLoader(
    TextureLoader,
    "assets/marauders-left.jpg"
  );
  const maraudersMapRight = useLoader(
    TextureLoader,
    "assets/marauders-right.jpg"
  );

  // const { position } = useControls({
  //   position: {
  //     value: { x: 0, y: 0, z: 1.3 },
  //     step: 0.01,
  //   },
  // });

  const clickMapHandler = () => {
    console.log("error");
    planeRef.current.position.z = 0;
    setDisplayMap(true);
    // planeRef.current.material.transparent = "true";
  };

  useFrame((state, delta) => {
    if (displayMap && groupLeft.current.rotation.y > -Math.PI) {
      // planeRefToShow.current.material.opacity += delta * 0.3;
      // planeRef.current.material.opacity -= delta * 0.3;
      groupLeft.current.rotation.y -= delta;
    }
  });

  return (
    <>
      <OrbitControls />

      <mesh ref={planeRef} scale={[1, 2, 0]} position-z={-0.01}>
        <planeGeometry />
        <meshBasicMaterial map={maraudersMapCenter} />
      </mesh>
      <group ref={groupLeft} position-x={-0.5}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={clickMapHandler}
          ref={planeLeft}
          position-x={0.5}
          scale={[1, 2, 0.01]}
        >
          <planeGeometry />
          <meshBasicMaterial side={DoubleSide} map={maraudersMapLeft} />
        </mesh>
      </group>
      {/* <mesh ref={planeRefToShow} scale={6}>
        <planeGeometry />
        <meshBasicMaterial
          transparent="true"
          opacity={0}
          map={maraudersMapShow}
        />
      </mesh> */}
      {/* <TransformControls object={planeRef} /> */}
    </>
  );
}
