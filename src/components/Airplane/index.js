import React, { useRef, forwardRef } from "react";

import { useFrame } from "@react-three/fiber";

import { color } from "../../utils/color";

export function Cabin(props) {
  const ref = useRef();
  const { airplaneColor } = props;

  useFrame(() => {
    ref.current.rotation.z = 33;
  });

  return (
    <mesh castShadow receiveShadow ref={ref}>
      <cylinderGeometry args={[30, 40, 80]} />
      <meshPhongMaterial color={airplaneColor} flatShading />
    </mesh>
  );
}

export function Engine() {
  return (
    <mesh position-x={40} castShadow receiveShadow>
      <boxGeometry args={[20, 50, 50]} />
      <meshPhongMaterial color={color.white} flatShading />
    </mesh>
  );
}

export function Wing(props) {
  const { airplaneColor } = props;
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[40, 8, 150]} />
      <meshPhongMaterial color={airplaneColor} flatShading />
    </mesh>
  );
}

export function Propeller() {
  return (
    <mesh position-x={50} castShadow receiveShadow>
      <boxGeometry args={[20, 10, 10]} />
      <meshPhongMaterial color={color.brown} flatShading />
      <PropellerShaft />
    </mesh>
  );
}

function PropellerShaft() {
  let r = useRef();
  useFrame(() => {
    r.current.rotation.x += 0.3;
  });

  return (
    <mesh position-x={6} castShadow receiveShadow ref={r}>
      <boxGeometry args={[1, 80, 13]} />
      <meshPhongMaterial color={color.brown} flatShading />
    </mesh>
  );
}

export const Plane = forwardRef((props, ref) => {
  const { airplaneColor } = props;
  return (
    <group scale={0.05} ref={ref}>
      <Cabin airplaneColor={airplaneColor} />
      <Engine />
      <Wing airplaneColor={airplaneColor} />
      <Propeller />
    </group>
  );
});
