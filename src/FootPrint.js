import { Html } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { TextureLoader } from "three";

const FOOTSTEP_ANIMATION_TIME = 1;
const FOOTSTEP_ANIMATION_SPEED = 3;

function animateFootPrint(obj, deltaTime) {
  console.log(obj.currentTimeAnimation);
  if (obj.currentTimeAnimation >= FOOTSTEP_ANIMATION_TIME && obj.isAppearing) {
    obj.isAppearing = false;
    console.log("hidden");
  } else if (obj.currentTimeAnimation <= 0 && !obj.isAppearing) {
    obj.isAppearing = true;
    obj.position.y += (FOOTSTEP_ANIMATION_SPEED * 2) / 30;
  }
  obj.currentTimeAnimation = obj.isAppearing
    ? obj.currentTimeAnimation + deltaTime
    : obj.currentTimeAnimation - deltaTime;

  const newOpacity = obj.currentTimeAnimation / FOOTSTEP_ANIMATION_TIME;
  obj.material.opacity = newOpacity;
}

export const FootPrint = ({
  pathLeftTexture,
  pathRightTexture,
  name,
  startAnimation,
}) => {
  const { position } = useControls("Feet", {
    position: { x: -7.6, y: 0, z: 0 },
  });

  const leftRef = useRef();
  const rightRef = useRef();

  const leftFootTexture = useLoader(TextureLoader, pathLeftTexture);
  const rightFootTexture = useLoader(TextureLoader, pathRightTexture);

  useFrame((state, delta) => {
    if (startAnimation) {
      animateFootPrint(leftRef.current, delta);
      animateFootPrint(rightRef.current, delta);
    }
  });

  return (
    <>
      <group scale={0.5}>
        <mesh
          ref={leftRef}
          name={"leftFoot"}
          scale={[0.1, 0.2, 0]}
          position={[position.x, position.y, 0.1]}
          isAppearing={false}
          currentTimeAnimation={FOOTSTEP_ANIMATION_TIME}
        >
          <planeGeometry />
          <meshStandardMaterial
            map={leftFootTexture}
            transparent="true"
            color={"#3F0304"}
          />
        </mesh>
        <mesh
          ref={rightRef}
          name={"rightFoot"}
          scale={[0.1, 0.2, 0]}
          position={[position.x + 0.1, position.y + 0.1, 0.1]}
          currentTimeAnimation={0}
          isAppearing={true}
        >
          <planeGeometry />
          <meshStandardMaterial
            map={rightFootTexture}
            transparent="true"
            color={"#3F0304"}
          />
          <Html
            wrapperClass="nameFeet"
            distanceFactor={6}
            style={{ color: "#3F0304" }}
          >
            Harry Potter
          </Html>
        </mesh>
      </group>
    </>
  );
};
