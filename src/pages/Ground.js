import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { color } from "../utils/color";

function Ground({ position, rotationSpeed }) {
  let ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += rotationSpeed;
  });

  return (
    <group>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        position={position}
        rotation-y="10"
      >
        <sphereGeometry args={[250, 8, 40]} />
        <meshPhongMaterial color={color.ground} transparent flatShading />
      </mesh>
    </group>
  );
}

export default Ground;
