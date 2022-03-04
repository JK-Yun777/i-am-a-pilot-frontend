import React, { useRef } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Instances } from "@react-three/drei";

import { color } from "../utils/color";
import { particles, Cloud } from "../components/Cloud";

function Clouds() {
  const ref = useRef();

  useFrame(
    (state, delta) =>
      void (ref.current.rotation.y = THREE.MathUtils.damp(
        ref.current.rotation.y,
        (-state.mouse.x * Math.PI) / 6,
        2.75,
        delta
      ))
  );
  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 10, 0]}
    >
      <dodecahedronBufferGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0} color={color.white} />
      {particles.map((data, i) => (
        <Cloud key={i} {...data} />
      ))}
    </Instances>
  );
}

export default Clouds;
