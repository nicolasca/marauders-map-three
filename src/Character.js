import {
  CatmullRomLine,
  Html,
  Line,
  TransformControls,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import {
  CatmullRomCurve3,
  CurvePath,
  DoubleSide,
  Path,
  SplineCurve,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";

const FOOTSTEP_ANIMATION_TIME = 1;
const FOOTSTEP_ANIMATION_SPEED = 3;

function animateFootPrint(foot, deltaTime, axis, radians, newPosition) {
  if (
    foot.currentTimeAnimation >= FOOTSTEP_ANIMATION_TIME &&
    foot.isAppearing
  ) {
    foot.isAppearing = false;
  } else if (foot.currentTimeAnimation <= 0 && !foot.isAppearing) {
    foot.isAppearing = true;

    foot.position.copy(newPosition);
    foot.position.z = 0.1;
    foot.quaternion.setFromAxisAngle(axis, radians);
  }
  foot.currentTimeAnimation = foot.isAppearing
    ? foot.currentTimeAnimation + deltaTime
    : foot.currentTimeAnimation - deltaTime;

  const newOpacity = foot.currentTimeAnimation / FOOTSTEP_ANIMATION_TIME;
  foot.material.opacity = newOpacity;
}

export const Character = ({
  pathLeftTexture,
  pathRightTexture,
  name,
  points,
  startAnimation,
}) => {
  const { position } = useControls("Feet", {
    position: points[0],
  });

  const leftRef = useRef();
  const rightRef = useRef();
  const characterRef = useRef();

  const leftFootTexture = useLoader(TextureLoader, pathLeftTexture);
  const rightFootTexture = useLoader(TextureLoader, pathRightTexture);

  // const path = new CatmullRomCurve3(points, true);
  const curve = new CatmullRomCurve3(points);
  const path = curve.getPoints(3);

  let fraction = 0;
  const up = new Vector3(0, 1, 0);
  const axis = new Vector3();

  useFrame((state, delta) => {
    const newPosition = curve.getPoint(fraction);
    const tangent = curve.getTangent(fraction).normalize();
    axis.crossVectors(up, tangent).normalize();
    const radians = Math.acos(up.dot(tangent));

    // characterRef.current.position.copy(newPosition);
    // characterRef.current.quaternion.setFromAxisAngle(axis, radians);
    // leftRef.current.quaternion.setFromAxisAngle(axis, radians);
    // rightRef.current.quaternion.setFromAxisAngle(axis, radians);

    const positionRight = new Vector3(
      newPosition.x + 0.1,
      newPosition.y,
      newPosition.z
    );
    animateFootPrint(leftRef.current, delta, axis, radians, newPosition);
    animateFootPrint(rightRef.current, delta, axis, radians, positionRight);

    // One delta is 1/60 of a second.
    fraction += delta / 60;
    if (fraction > 1) {
      fraction = 0;
    }
  });
  return (
    <>
      {/* <CatmullRomLine points={path} color="red" /> */}
      <group ref={characterRef} scale={0.5}>
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
            side={DoubleSide}
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
            {name}
          </Html>
        </mesh>
      </group>
    </>
  );
};
