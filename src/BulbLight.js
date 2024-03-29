/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { Sphere, SpotLight, useCursor, useGLTF, useHelper } from "@react-three/drei";
import { Bloom } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { Color, DirectionalLightHelper, PointLightHelper } from "three";

export function BulbLight(props) {
  const { nodes, materials } = useGLTF("assets/models/bulb-light.glb");
  const [triggerLight, setTriggerLight] = useState(false);
  const [hovered, setHovered] = useState();

  const lightRef = useRef();
  const pointLight = useRef();

  useHelper(lightRef, DirectionalLightHelper, 1);
  useCursor(hovered /*'pointer', 'auto'*/);

  const { activeLight, position, emissiveIntensity } = useControls("Bulb Light", {
    activeLight: {
      value: false,
      onChange: (value) => {
        setTriggerLight(value);
      },
    },
    position: [0, 3.5, 2],
    emissiveIntensity: 1
  });

  return (
    <group {...props} dispose={null}>
      <pointLight ref={pointLight} position={[0, 3, -1]} intensity={triggerLight ?  0.7 : 0}/>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        position={[0.5, 3.2, -2.3]}
        rotation={[-2.9, 0, 3.1]}
        onClick={() => setTriggerLight(!triggerLight)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#ffffff"
          toneMapped={triggerLight ?  false : true}
          emissive={"white"}
          emissiveIntensity={triggerLight ?  emissiveIntensity : 0}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials["Material.002"]}
        position={[0.5, 3.3, -2.7]}
        rotation={[-2.9, 0, 3.1]}
        scale={1.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={materials["Material.005"]}
        position={[0.5, 3.2, -2.4]}
        rotation={[-1.3, 0, 3.1]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.006"]}
        position={[0.4, 3.1, -2]}
        rotation={[-1.3, 0, 3]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.006"]}
        position={[0.5, 3.1, -2]}
        rotation={[-1.3, 0, -3.1]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[0.6, 3.1, -2]}
        rotation={[-1.3, 0, -1.2]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[0.6, 3.1, -1.9]}
        rotation={[-1.3, 0, -1.4]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[0.6, 3.1, -2.1]}
        rotation={[-1.3, 0, -1.3]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[0.5, 3.2, -2.1]}
        rotation={[-1.3, 0, -1.4]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[0.5, 3.2, -2.2]}
        rotation={[-1.3, 0, -1.4]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[0.5, 3.2, -2.3]}
        rotation={[-1.3, 0, -1.4]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[0.4, 3.1, -1.9]}
        rotation={[-1.4, 0, -1.7]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[0.4, 3.2, -2.2]}
        rotation={[-1.4, 0, -1.7]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[0.4, 3.2, -2.2]}
        rotation={[-1.4, 0, -1.7]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[0.4, 3.2, -2.3]}
        rotation={[-1.4, 0, -2.1]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[0.4, 3.1, -2]}
        rotation={[-1.3, 0, -1.3]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials["Material.006"]}
        position={[0.4, 3.1, -2]}
        rotation={[-1.3, 0, -3.1]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials["Material.006"]}
        position={[0.4, 3.1, -2]}
        rotation={[-1.3, 0, -3.1]}
        scale={0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials["Material.005"]}
        position={[0.5, 3.3, -2.7]}
        rotation={[-2.9, 0, 0.4]}
        scale={1.1}
      />
    </group>
  );
}

useGLTF.preload("assets/models/bulb-light.glb");
