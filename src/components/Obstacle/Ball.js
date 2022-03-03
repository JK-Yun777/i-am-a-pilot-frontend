import React, { useEffect } from "react";

import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";

import { useStore } from "../../utils/store";

function Ball(props) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: [0.4],
    velocity: [0, 5, 0],
    ...props,
  }));
  const restart = useStore((state) => state.restart);
  useEffect(() => {
    if (restart) {
      api.position.set(0, 3, 0);
      api.velocity.set(0, 5, 0);
      api.angularVelocity.set(0, 0, 0);
    }
  }, [restart]);
  return (
    <Sphere castShadow ref={ref} args={[0.4, 64, 64]}>
      <meshStandardMaterial color="pink" />
    </Sphere>
  );
}

export default Ball;
