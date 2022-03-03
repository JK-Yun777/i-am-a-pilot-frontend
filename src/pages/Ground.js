import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { ground } from "../utils/color";

function Ground() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -30, 0]} scale={26}>
      <mesh receiveShadow ref={mesh}>
        <dodecahedronGeometry args={[1, 0]} roughness />
        <meshStandardMaterial color={ground.ground6} />
      </mesh>
    </group>
  );
}

export default Ground;
