import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { ground } from "../config/color";

export default function Ground() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -22, 0]} scale={20}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh receiveShadow castShadow ref={mesh}>
          <sphereGeometry args={[1, 13, 7]} />
          <meshLambertMaterial color={ground.ground2} />
        </mesh>
      </group>
    </group>
  );
}
