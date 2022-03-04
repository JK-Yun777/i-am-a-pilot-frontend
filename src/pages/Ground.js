import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { color } from "../utils/color";

function Ground() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -30, 0]} scale={26}>
      <mesh receiveShadow ref={mesh}>
        <dodecahedronGeometry args={[1, 0]} roughness />
        <meshStandardMaterial color={color.ground} />
      </mesh>
    </group>
  );
}

export default Ground;
