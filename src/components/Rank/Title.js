import React, { useMemo, useRef, useLayoutEffect } from "react";

import * as THREE from "three";
import { extend, useLoader, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import boldUrl from "../../assets/fonts/bold.blob";

extend({ TextGeometry });

function Title({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  ...props
}) {
  const font = useLoader(FontLoader, boldUrl);
  const config = useMemo(
    () => ({
      font,
      size: 5,
      height: 10,
      curveSegments: 2,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    [font]
  );
  const mesh = useRef();
  useLayoutEffect(() => {
    const size = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    mesh.current.position.z =
      vAlign === "center" ? -size.z / -2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}

function MainTitle() {
  const ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.cos(time / 4) / 8;
    ref.current.rotation.y = Math.sin(time / 4) / 8;
    ref.current.rotation.z = (1 + Math.sin(time / 1.5)) / 20;
    ref.current.position.y = (1 + Math.sin(time / 1.5)) / 35;
  });

  return (
    <group ref={ref}>
      <Title hAlign="center" position={[0, 2, 0]} children="RANK" />
    </group>
  );
}

export default MainTitle;
