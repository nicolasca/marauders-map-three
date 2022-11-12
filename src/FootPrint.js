import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";

const FOOTSTEP_ANIMATION_TIME = 1;
const FOOTSTEP_ANIMATION_SPEED = 3;

function animateFootPrint(obj, deltaTime) {
  if (obj.currentTimeAnimation >= FOOTSTEP_ANIMATION_TIME && obj.isAppearing) {
    obj.isAppearing = false;
  } else if (obj.currentTimeAnimation <= 0 && !obj.isAppearing) {
    obj.isAppearing = true;
    console.log(obj.name, obj.position.y);
    obj.position.y += (FOOTSTEP_ANIMATION_SPEED * 2) / 30;
    console.log(obj.name, obj.position.y);
  }

  obj.currentTimeAnimation = obj.isAppearing
    ? obj.currentTimeAnimation + deltaTime
    : obj.currentTimeAnimation - deltaTime;

  const newOpacity = obj.currentTimeAnimation / FOOTSTEP_ANIMATION_TIME;
  obj.material.opacity = newOpacity;
}

export const FootPrint = ({ pathLeftTexture, pathRightTexture, name }) => {
  const [previousTime, setPreviousTime] = useState(0);

  const leftRef = useRef();
  const rightRef = useRef();

  const leftFootTexture = useLoader(TextureLoader, pathLeftTexture);
  const rightFootTexture = useLoader(TextureLoader, pathRightTexture);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    const deltaTime = Math.abs(elapsedTime - previousTime);
    setPreviousTime(elapsedTime);

    animateFootPrint(leftRef.current, deltaTime);
    animateFootPrint(rightRef.current, deltaTime);
  });

  return (
    <>
      <group>
        <mesh
          ref={leftRef}
          name={"leftFoot"}
          scale={[0.1, 0.2, 0]}
          position-z={0.1}
          isAppearing={false}
          currentTimeAnimation={FOOTSTEP_ANIMATION_TIME}
        >
          <planeGeometry />
          <meshStandardMaterial map={leftFootTexture} transparent="true" />
        </mesh>
        <mesh
          ref={rightRef}
          name={"rightFoot"}
          scale={[0.1, 0.2, 0]}
          position={[0.1, 0.1, 0.1]}
          currentTimeAnimation={0}
          isAppearing={true}
        >
          <planeGeometry />
          <meshStandardMaterial map={rightFootTexture} transparent="true" />
          <Html>Harry Potter</Html>
        </mesh>
      </group>
    </>
  );
};
