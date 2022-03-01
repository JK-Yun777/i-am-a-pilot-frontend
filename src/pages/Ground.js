import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { ground } from "../utils/color";

function Ground() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    // <group receiveShadow position={[0, -33, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    //   <mesh>
    //     <planeGeometry args={[10000, 10000]} />
    //     <meshLambertMaterial color={ground.ground3} />
    //   </mesh>
    // </group>

    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -30, 0]} scale={26}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh receiveShadow ref={mesh}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={ground.ground2} roughness={2} />
        </mesh>
      </group>
    </group>
  );
}

export default Ground;
