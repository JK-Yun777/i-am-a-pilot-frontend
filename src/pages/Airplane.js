import React, { useState, useEffect } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";

import { useStore } from "../utils/store";
import { color } from "../utils/color";
import { Plane } from "../components/Airplane";
import { useCollide } from "../components/BonusObjects";
import ExplosionParticles from "../components/ExplosionParticles";

function AirPlane() {
  const [isHited, setIsHited] = useState(false);
  const [criticalHit, setCriticalHit] = useState(false);
  const [impact, onCollide] = useCollide();
  const { viewport } = useThree();
  const { width, height } = viewport;
  const airplaneColor = useStore((state) => state.airplaneColor);

  useEffect(() => {
    if (impact.get()) {
      setIsHited(true);
    } else {
      setIsHited(false);
    }

    if (impact.get() > 0.01) {
      setCriticalHit(true);
    } else {
      setCriticalHit(false);
    }
  }, [isHited, impact, criticalHit]);

  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [2.25, 0.75, 1],
    onCollide,
  }));

  useFrame((state) => {
    api.position.set(
      state.mouse.x * (width / 2 + 2),
      state.mouse.y * (height / 2 + 2),
      0
    );

    api.rotation.set(0, 1.5, (state.mouse.x * Math.PI) / 5);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={0.5} />
      <Physics>
        <mesh ref={ref}>
          <Plane airplaneColor={airplaneColor} />
          {isHited && <ExplosionParticles color={color.hotpink} />}
          {criticalHit && <ExplosionParticles color={color.red} />}
        </mesh>
      </Physics>
    </>
  );
}

export default AirPlane;
