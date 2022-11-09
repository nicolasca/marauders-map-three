import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useControls } from "leva";
import { Noise, Pixelation, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { MathUtils, TextureLoader } from "three";

export default function Experience() {
  const [displayMap, setDisplayMap] = useState(false);
  const planeRef = useRef();
  const planeRefToShow = useRef();
  const pixelEffect = useRef();

  const maraudersMapHidden = useLoader(
    TextureLoader,
    "assets/marauders-map-hidden.png"
  );
  const maraudersMapShow = useLoader(TextureLoader, "assets/marauders-map.jpg");

  const { position } = useControls({
    position: {
      value: { x: 0, y: 0, z: 1.3 },
      step: 0.01,
    },
  });

  const clickMapHandler = () => {
    setDisplayMap(true);
    planeRef.current.material.transparent = "true";
    // pixelEffect.current.granularity = 3;
  };

  useFrame((state, delta) => {
    if (displayMap && planeRefToShow.current.material.opacity < 1) {
      // Fade in the map using the clock
      console.log("change opcaity");
      //   pixelEffect.current.granularity -= delta * 0.3;
      planeRefToShow.current.material.opacity += delta * 0.3;
      planeRef.current.material.opacity -= delta * 0.3;
    }
  });

  return (
    <>
      <OrbitControls />
      {/* <mesh scale={[1, 1, 1]} position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" wireframe />
      </mesh>
      <mesh ref={cubeRef} position-x={2}>
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh> */}
      <mesh
        onClick={clickMapHandler}
        position={[position.x, position.y, position.z]}
        ref={planeRef}
        scale={6}
      >
        <planeGeometry />
        <meshBasicMaterial map={maraudersMapHidden} />
      </mesh>

      {/* <EffectComposer>
        <Pixelation
          ref={pixelEffect}
          granularity={0} // pixel granularity
        />
      </EffectComposer> */}

      <mesh
        position={[position.x, position.y, position.z]}
        ref={planeRefToShow}
        scale={6}
      >
        <planeGeometry />
        <meshBasicMaterial
          transparent="true"
          opacity={0}
          map={maraudersMapShow}
        />
      </mesh>

      {/* <TransformControls object={planeRef} /> */}
    </>
  );
}
