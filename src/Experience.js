import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";
import { useControls } from "leva";

import { TextureLoader, DoubleSide } from "three";
import { FootPrint } from "./FootPrint";

const HEIGHT_SIZE = 10;
const WIDTH_SIZE = 5;

export default function Experience() {
  const [displayMap, setDisplayMap] = useState(false);
  const [isOpeningOver, setOpeningOver] = useState(false);
  const [leftSideOpened, setLeftSideOpened] = useState(false);
  const [rightSideOpened, setRightSideOpened] = useState(false);
  const [hovered, setHovered] = useState();

  const planeRef = useRef();

  const groupRight = useRef();
  const planeRightHidden = useRef();
  const planeRightVisible = useRef();

  const groupLeft = useRef();
  const planeLeftHidden = useRef();
  const planeLeftVisible = useRef();

  useCursor(hovered /*'pointer', 'auto'*/);

  const mapLeftVisible = useLoader(
    TextureLoader,
    "assets/map/map-left-visible.jpg"
  );
  const leftHeight = useLoader(TextureLoader, "assets/map/left-height.png");

  const mapRightVisible = useLoader(
    TextureLoader,
    "assets/map/map-right-visible.jpg"
  );

  const maraudersMapCenter = useLoader(
    TextureLoader,
    "assets/map/map-center.jpg"
  );
  const maraudersMapLeft = useLoader(
    TextureLoader,
    "assets/map/map-left-hidden.jpg"
  );

  const maraudersMapRight = useLoader(
    TextureLoader,
    "assets/map/map-right-hidden.jpg"
  );

  // const { position } = useControls({
  //   position: {
  //     value: { x: 0, y: 0, z: 1.3 },
  //     step: 0.01,
  //   },
  // });

  const clickMapHandler = () => {
    console.log("still here");
    planeRef.current.position.z = 0;
    setDisplayMap(true);
  };

  useFrame((state, delta) => {
    // First left side animation
    if (displayMap && groupLeft.current.rotation.y > -Math.PI) {
      groupLeft.current.rotation.y -= delta * 2;
    } else if (displayMap && groupLeft.current.rotation.y <= -Math.PI) {
      setLeftSideOpened(true);
    }

    // If left side animation done, start the right side animation
    if (leftSideOpened && groupRight.current.rotation.y < Math.PI) {
      groupRight.current.rotation.y += delta * 2;
    } else if (leftSideOpened && groupRight.current.rotation.y >= Math.PI) {
      setRightSideOpened(true);
    }

    // When both sides are opened, start the fade in map animation
    if (
      rightSideOpened & leftSideOpened &&
      planeRightVisible.current.material.opacity < 1
    ) {
      planeLeftVisible.current.material.opacity += delta * 0.3;
      planeRightVisible.current.material.opacity += delta * 0.3;

      planeLeftHidden.current.material.opacity -= delta * 0.3;
      planeRightHidden.current.material.opacity -= delta * 0.3;
    } else if (
      rightSideOpened & leftSideOpened &&
      planeRightVisible.current.material.opacity >= 1
    ) {
      planeLeftHidden.current.remove();
      planeRightHidden.current.visible = false;
      setOpeningOver(true);
    }
  });

  return (
    <>
      <OrbitControls />

      <mesh
        ref={planeRef}
        scale={[WIDTH_SIZE, HEIGHT_SIZE, 0]}
        position-z={-0.01}
      >
        <planeGeometry />
        <meshBasicMaterial map={maraudersMapCenter} />
      </mesh>
      <group ref={groupLeft} position-x={-WIDTH_SIZE / 2}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={clickMapHandler}
          ref={planeLeftHidden}
          position-x={WIDTH_SIZE / 2}
          scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.01]}
        >
          <planeGeometry />
          <meshStandardMaterial
            attach="material"
            transparent="true"
            map={mapLeftVisible}
          />
        </mesh>
      </group>

      <mesh
        ref={planeLeftVisible}
        position-x={-WIDTH_SIZE}
        scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.05]}
        rotation-z={Math.PI}
      >
        <planeGeometry />
        <meshStandardMaterial
          map={mapLeftVisible}
          displacementMap={leftHeight}
          transparent="true"
          opacity={0}
        />
      </mesh>

      <group ref={groupRight} position-x={WIDTH_SIZE / 2}>
        <mesh
          ref={planeRightHidden}
          position-x={-WIDTH_SIZE / 2}
          scale={[WIDTH_SIZE, HEIGHT_SIZE, 0]}
          rotation-z={Math.PI}
          transparent="true"
        >
          <planeGeometry />
          <meshBasicMaterial side={DoubleSide} map={maraudersMapRight} />
        </mesh>
      </group>

      <mesh
        ref={planeRightVisible}
        position-x={WIDTH_SIZE}
        scale={[WIDTH_SIZE, HEIGHT_SIZE, 0]}
        rotation-z={Math.PI}
      >
        <planeGeometry />
        <meshBasicMaterial
          map={mapRightVisible}
          transparent="true"
          opacity={0}
        />
      </mesh>

      {/* {isOpeningOver && (
        <FootPrint
          pathLeftTexture="assets/footprint/footprint-left.png"
          pathRightTexture="assets/footprint/footprint-right.png"
        />
      )} */}
    </>
  );
}
