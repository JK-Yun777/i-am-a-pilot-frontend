import React, { useRef } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Instance } from "@react-three/drei";

export const particles = Array.from({ length: 30 }, () => ({
  factor: THREE.MathUtils.randInt(20, 50),
  speed: THREE.MathUtils.randFloat(0.01, 1),
  xFactor: THREE.MathUtils.randFloatSpread(80),
  yFactor: THREE.MathUtils.randFloatSpread(40),
  zFactor: THREE.MathUtils.randFloatSpread(40),
}));

export function Cloud({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );
  });
  return <Instance ref={ref} />;
}
