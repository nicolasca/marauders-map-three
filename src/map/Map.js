import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";
import { useControls } from "leva";
import { TextureLoader, DoubleSide } from "three";

const HEIGHT_SIZE = 10;
const WIDTH_SIZE = 5;

export const Map = ({ handleMapOpened }) => {
  const [displayMap, setDisplayMap] = useState(false);
  const [displayHeight, setDisplayHeight] = useState(false);
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

  const [
    mapLeftVisible,
    mapRightVisible,
    maraudersMapCenter,
    maraudersMapLeft,
    maraudersMapRight,
    heightLeftMap,
    heightRightMap,
  ] = useLoader(TextureLoader, [
    "assets/map/map-left-visible.jpg",
    "assets/map/map-right-visible.jpg",
    "assets/map/map-center.jpg",
    "assets/map/map-left-hidden.jpg",
    "assets/map/map-right-hidden.jpg",
    "assets/map/map-left-visible-floutix.png",
    "assets/map/map-right-visible-floutix.jpg",
  ]);

  const clickMapHandler = () => {
    console.log("still here");
    planeRef.current.position.z = 0;
    setDisplayMap(true);
  };

  const makeHeightMap = () => {
    setDisplayHeight(true);
  };

  useFrame((state, delta) => {
    if (displayMap) {
      planeRef.current.scale.z = 0.01;
    }

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
    } else if (
      rightSideOpened & leftSideOpened &&
      planeRightVisible.current.material.opacity >= 1
    ) {
      planeLeftHidden.current.remove();
      planeRightHidden.current.visible = false;
      handleMapOpened(true);
    }

    if (
      displayHeight &
      (planeLeftVisible.current.material.displacementScale < 1)
    ) {
      planeLeftVisible.current.material.displacementScale += 0.005;
      planeLeftVisible.current.material.heightScale += 0.005;
      planeRightVisible.current.material.displacementScale += 0.005;
      planeRightVisible.current.material.heightScale += 0.005;
    }
  });

  return (
    <group position-y={-1}>
      <mesh ref={planeRef} scale={[WIDTH_SIZE, HEIGHT_SIZE, 0]}>
        <planeGeometry />
        <meshStandardMaterial map={maraudersMapCenter} />
      </mesh>
      <group ref={groupLeft} position-x={-WIDTH_SIZE / 2}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={clickMapHandler}
          ref={planeLeftHidden}
          position-x={WIDTH_SIZE / 2}
          scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.01]}
          position-z={0.01}
        >
          <planeGeometry />
          <meshStandardMaterial
            attach="material"
            transparent="true"
            side={DoubleSide}
            map={maraudersMapLeft}
          />
        </mesh>
      </group>

      <group ref={groupRight} position-x={WIDTH_SIZE / 2}>
        <mesh
          ref={planeRightHidden}
          position-x={-WIDTH_SIZE / 2}
          scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.01]}
          rotation-z={Math.PI}
        >
          <planeGeometry />
          <meshStandardMaterial 
            side={DoubleSide} 
            map={maraudersMapRight} 
            attach="material"
            transparent="true"
            />
        </mesh>
      </group>

      <mesh
        ref={planeLeftVisible}
        position-x={-WIDTH_SIZE}
        scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.05]}
        onClick={makeHeightMap}
      >
        <planeGeometry args={[1, 1, 200, 200]} />
        <meshStandardMaterial
          map={mapLeftVisible}
          displacementMap={heightLeftMap}
          bumpMap={heightLeftMap}
          bumpScale={0}
          displacementScale={0}
          transparent="true"
          opacity={0}
          side={DoubleSide}
        />
      </mesh>

      <mesh
        ref={planeRightVisible}
        position-x={WIDTH_SIZE}
        scale={[WIDTH_SIZE, HEIGHT_SIZE, 0.05]}
      >
        <planeGeometry args={[1, 1, 200, 200]} />
        <meshStandardMaterial
          map={mapRightVisible}
          transparent="true"
          opacity={0}
          displacementMap={heightRightMap}
          bumpMap={heightRightMap}
          bumpScale={0}
          displacementScale={0}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};
